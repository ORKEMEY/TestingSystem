import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import ItemService from '../utils/item.service';
import Log from '../models/log.model';

@Injectable({ providedIn: 'root' })
export default class LogService extends ItemService<Log> {
  constructor(private http: HttpClient) {
    super();
  }

  public getById(id: number, observer?: Observer<Log>) {
    this.http
      .get(`api/Logs/${id}`)
      .pipe(map((data) => data as Log))
      .subscribe({
        next: (data) => observer?.next?.(data),
        error: (err) => {
          if (err.status === 400) {
            observer?.error?.(err.error.errorText);
          } else {
            console.error(err);
          }
        },
        complete: () => observer?.complete?.(),
      });
  }

  public refreshLogs() {
    this.http
      .get('api/Logs')
      .pipe(map((data) => data as Log[]))
      .subscribe({
        next: (data: Log[]) => this.subject.next(data),
        error: (err) => {
          console.error(err);
          this.subject.next(null);
        },
      });
  }

  public searchLogsByTestId(testId: number, observer?: Observer<void>) {
    this.http
      .get(`api/Logs/search?testId=${testId}`)
      .pipe(map((data) => data as Log[]))
      .subscribe({
        next: (data: Log[]) => {
          this.subject.next(data);
          observer?.next?.();
        },
        error: (err) => {
          console.error(err);
          this.subject.next(null);
        },
      });
  }

  public postLog(log: Log, observer?: Observer<number>) {
    this.http.post('api/Logs', log).subscribe({
      next: (id) => observer?.next?.(id as number),
      error: (err) => {
        if (err.status === 400) {
          observer?.error?.(err.error.errorText);
        } else {
          console.error(err);
        }
      },
      complete: () => observer?.complete?.(),
    });
  }

  public putModel(log: Log, observer?: Observer<void>) {
    this.http.put('api/Logs', log).subscribe({
      next: () => observer?.next?.(),
      error: (err) => {
        if (err.status === 400) {
          observer?.error?.(err.error.errorText);
        } else {
          console.error(err);
        }
      },
      complete: () => observer?.complete?.(),
    });
  }

  public async DeleteModelTypeAsync(logId: number, observer?: Observer<void>) {
    await this.http.delete(`api/Logs/${logId}`).subscribe({
      next: () => observer?.next?.(),
      error: (err) => {
        if (err.status === 400) {
          observer?.error?.(err.error.errorText);
        } else {
          console.error(err);
        }
      },
      complete: () => observer?.complete?.(),
    });
  }
}
