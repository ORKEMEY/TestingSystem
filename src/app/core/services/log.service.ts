import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import Log from '../models/log.model';

@Injectable({ providedIn: 'root' })
export default class LogService {
  private dataLogs: BehaviorSubject<Log[] | null>;

  public dataLogs$: Observable<Log[] | null>;

  constructor(private http: HttpClient) {
    this.dataLogs = new BehaviorSubject<Log[] | null>(null);
    this.dataLogs$ = this.dataLogs.asObservable();
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
        next: (data: Log[]) => this.dataLogs.next(data),
        error: (err) => {
          console.error(err);
          this.dataLogs.next(null);
        },
      });
  }

  public searchLogsByTestId(testId: number, observer?: Observer<void>) {
    this.http
      .get(`api/Logs/search?testId=${testId}`)
      .pipe(map((data) => data as Log[]))
      .subscribe({
        next: (data: Log[]) => {
          this.dataLogs.next(data);
          observer?.next?.();
        },
        error: (err) => {
          console.error(err);
          observer?.error?.(err);
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
