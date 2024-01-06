import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import Test from '../models/test.model';
import Log from '../models/log.model';
import TestResult from '../models/test-result.model';

@Injectable({ providedIn: 'root' })
export default class TestService {
  private dataTests: BehaviorSubject<Test[] | null>;

  public dataTests$: Observable<Test[] | null>;

  constructor(private http: HttpClient) {
    this.dataTests = new BehaviorSubject<Test[] | null>(null);
    this.dataTests$ = this.dataTests.asObservable();
  }

  public getOwnedById(id: number, observer?: Observer<Test>) {
    this.http
      .get(`api/Tests/owned/${id}`)
      .pipe(map((data) => data as Test))
      .subscribe({
        next: (data) => observer?.next?.(data),
        error: (err) => {
          if (err.status === 400) {
            observer?.error?.(err.error.errorText);
          } else {
            observer?.error?.(err);
            console.error(err);
          }
        },
        complete: () => observer?.complete?.(),
      });
  }

  public refreshOwnedTests() {
    this.http
      .get('api/Tests/owned')
      .pipe(map((data) => data as Test[]))
      .subscribe({
        next: (data: Test[]) => this.dataTests.next(data),
        error: (err) => {
          console.error(err);
          this.dataTests.next(null);
        },
      });
  }

  public searchOwnedTestsByName(name: string) {
    this.http
      .get(`api/Tests/owned/search?name=${name}`)
      .pipe(map((data) => data as Test[]))
      .subscribe({
        next: (data: Test[]) => this.dataTests.next(data),
        error: (err) => {
          console.error(err);
          this.dataTests.next(null);
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
          observer?.error?.(err);
          console.error(err);
        }
      },
      complete: () => observer?.complete?.(),
    });
  }

  public checkTest(test: Test, log: Log, observer?: Observer<TestResult>) {
    this.http
      .post('api/Tests/checktest', {
        test,
        log,
      })
      .subscribe({
        next: (res) => observer?.next?.(res as TestResult),
        error: (err) => {
          if (err.status === 400) {
            observer?.error?.(err.error.errorText);
          } else {
            observer?.error?.(err);
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
          observer?.error?.(err);
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
          observer?.error?.(err);
          console.error(err);
        }
      },
      complete: () => observer?.complete?.(),
    });
  }
}
