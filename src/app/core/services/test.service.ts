import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import ItemService from '../utils/item.service';
import Test from '../models/test.model';
import Log from '../models/log.model';

@Injectable({ providedIn: 'root' })
export default class TestService extends ItemService<Test> {
  constructor(private http: HttpClient) {
    super();
  }

  public getById(id: number /* , observer?: Observer<Test> */): Observable<Test> {
    return this.http.get(`api/Tests/${id}`).pipe(
      catchError((err) => {
        if (err.status === 400) {
          throw err.error.errorText;
        }
        throw err;
      }),
      map((data) => data as Test),
    );
  }

  public getOwnedById(id: number /* , observer?: Observer<Test> */): Observable<Test> {
    return this.http.get(`api/Tests/owned/${id}`).pipe(
      catchError((err) => {
        if (err.status === 400) {
          throw err.error.errorText;
        }
        throw err;
      }),
      map((data) => data as Test),
    );
  }

  public refreshOwnedTests() {
    this.http
      .get('api/Tests/owned')
      .pipe(map((data) => data as Test[]))
      .subscribe({
        next: (data: Test[]) => this.subject.next(data),
        error: (err) => {
          console.error(err);
          this.subject.next(null);
        },
      });
  }

  public searchOwnedTestsByName(name: string) {
    this.http
      .get(`api/Tests/owned/search?name=${name}`)
      .pipe(map((data) => data as Test[]))
      .subscribe({
        next: (data: Test[]) => this.subject.next(data),
        error: (err) => {
          console.error(err);
          this.subject.next(null);
        },
      });
  }

  public postOwnedTest(test: Test, observer?: Observer<number>) {
    this.http.post('api/Tests/owned', test).subscribe({
      next: (id) => observer?.next?.(id as number),
      error: (err) => {
        if (err.status === 400) {
          observer?.error?.(err.error.errorText);
        } else {
          // observer?.error?.(err);
          console.error(err);
        }
      },
      complete: () => observer?.complete?.(),
    });
  }

  public checkTest(test: Test, log: Log, observer?: Observer<Log>) {
    this.http
      .post('api/Tests/checktest', {
        test,
        log,
      })
      .subscribe({
        next: (res) => observer?.next?.(res as Log),
        error: (err) => {
          if (err.status === 400) {
            observer?.error?.(err.error.errorText);
          } else {
            // observer?.error?.(err);
            console.error(err);
          }
        },
        complete: () => observer?.complete?.(),
      });
  }

  public putOwnedTest(test: Test, observer?: Observer<void>) {
    this.http.put('api/Tests/owned', test).subscribe({
      next: () => observer?.next?.(),
      error: (err) => {
        if (err.status === 400) {
          observer?.error?.(err.error.errorText);
        } else {
          // observer?.error?.(err);
          console.error(err);
        }
      },
      complete: () => observer?.complete?.(),
    });
  }

  public async DeleteOwnedTestAsync(testId: number, observer?: Observer<void>) {
    await this.http.delete(`api/Tests/owned/${testId}`).subscribe({
      next: () => observer?.next?.(),
      error: (err) => {
        if (err.status === 400) {
          observer?.error?.(err.error.errorText);
        } else {
          // observer?.error?.(err);
          console.error(err);
        }
      },
      complete: () => observer?.complete?.(),
    });
  }
}
