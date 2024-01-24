import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ItemService from './item.service';
import Log from '../models/log.model';

@Injectable({ providedIn: 'root' })
export default class LogService extends ItemService<Log> {
  public constructor(http: HttpClient) {
    super(http);
  }

  public getById(id: number): Observable<Log> {
    return this.get<Log>(`api/Logs/${id}`);
  }

  public refreshLogs() {
    this.get<Log[]>('api/Logs').subscribe({
      next: (data: Log[]) => this.subject.next(data),
      error: (err) => {
        console.error(err);
        this.subject.next(null);
      },
    });
  }

  public searchLogsByTestId(testId: number) {
    this.get<Log[]>(`api/Logs/search?testId=${testId}`).subscribe({
      next: (data: Log[]) => {
        this.subject.next(data);
      },
      error: (err) => {
        console.error(err);
        this.subject.next(null);
      },
    });
  }

  public postLog(log: Log): Observable<number> {
    return this.post<number>('api/Logs', log);
  }

  public putModel(log: Log): Observable<void | Object> {
    return this.put('api/Logs', log);
  }

  public deleteModelType(logId: number): Observable<void | Object> {
    return this.delete(`api/Logs/${logId}`);
  }
}
