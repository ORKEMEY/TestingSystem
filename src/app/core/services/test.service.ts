import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import CredentialsService from './credentials.service';
import Test from '../models/test.model';

@Injectable({ providedIn: 'root' })
export default class TestService {
  private dataTests: BehaviorSubject<Test[] | null>;

  public dataTests$: Observable<Test[] | null>;

  constructor(private http: HttpClient, private credentialsService: CredentialsService) {
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
      .get(`api/Tests/owned/search/${name}`)
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
          console.error(err);
        }
      },
      complete: () => observer?.complete?.(),
    });
  }
  /*
  public post(test: Test, observer?: Observer<void>) {
    return this.http
      .post(
        `api/Tests?name=${test.name}&hours=${test.time.hours}&minutes=${test.time.minutes}`,
        null,
      )
      .subscribe({
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
  } */
  /*
  public async AddQuestionAsync(testId: number, questionId: number, observer?: Observer<void>) {
    await this.http.post(`api/Tests/${testId}/${questionId}`, null).subscribe({
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
*/
  /*
  public async DeleteQuestionAsync(testId: number, questionId: number, observer?: Observer<void>) {
    await this.http.delete(`api/Tests/${testId}/${questionId}`).subscribe({
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
*/
  /*
  public CheckTest(testId: number, answerid: number[], observer?: Observer<CheckResponse>) {
    console.log(answerid);
    this.http
      .post(`api/Tests/${testId}?login=${this.credentialsService.getLogin()}`, answerid)
      .pipe(map((data) => data as CheckResponse))
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
  } */
}
