import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ItemService from './item.service';
import Test from '../models/test.model';
import Log from '../models/log.model';

@Injectable({ providedIn: 'root' })
export default class TestService extends ItemService<Test> {
  public constructor(http: HttpClient) {
    super(http);
  }

  public getById(id: number): Observable<Test> {
    return this.get(`api/Tests/${id}`);
  }

  public getOwnedById(id: number): Observable<Test> {
    return this.get(`api/Tests/owned/${id}`);
  }

  public refreshOwnedTests() {
    this.get<Test[]>('api/Tests/owned').subscribe({
      next: (data: Test[]) => this.subject.next(data),
      error: (err) => {
        console.error(err);
        this.subject.next(null);
      },
    });
  }

  public searchOwnedTestsByName(name: string) {
    this.get<Test[]>(`api/Tests/owned/search?name=${name}`).subscribe({
      next: (data: Test[]) => this.subject.next(data),
      error: (err) => {
        console.error(err);
        this.subject.next(null);
      },
    });
  }

  public postOwnedTest(test: Test): Observable<number> {
    return this.post<number>('api/Tests/owned', test);
  }

  public checkTest(test: Test, log: Log): Observable<Log> {
    return this.post<Log>('api/Tests/checktest', {
      test,
      log,
    });
  }

  public putOwnedTest(test: Test): Observable<void | Object> {
    return this.put('api/Tests/owned', test);
  }

  public deleteOwnedTest(testId: number): Observable<void | Object> {
    return this.delete(`api/Tests/owned/${testId}`);
  }
}
