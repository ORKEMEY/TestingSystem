import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import TestVariant from '../models/test-variant.model';

@Injectable({ providedIn: 'root' })
export default class TestVariantService {
  private dataTestVariants: BehaviorSubject<TestVariant[] | null>;

  public dataTestVariants$: Observable<TestVariant[] | null>;

  constructor(private http: HttpClient) {
    this.dataTestVariants = new BehaviorSubject<TestVariant[] | null>(null);
    this.dataTestVariants$ = this.dataTestVariants.asObservable();
  }

  public getById(id: number, observer?: Observer<TestVariant>) {
    this.http
      .get(`api/TestVariants/${id}`)
      .pipe(map((data) => data as TestVariant))
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

  public refreshTestVariants() {
    this.http
      .get('api/TestVariants')
      .pipe(map((data) => data as TestVariant[]))
      .subscribe({
        next: (data: TestVariant[]) => this.dataTestVariants.next(data),
        error: (err) => {
          console.error(err);
          this.dataTestVariants.next(null);
        },
      });
  }

  public searchTestVariantsByTestId(id: number) {
    this.http
      .get(`api/TestVariants/search?testId=${id}`)
      .pipe(map((data) => data as TestVariant[]))
      .subscribe({
        next: (data: TestVariant[]) => this.dataTestVariants.next(data),
        error: (err) => {
          console.error(err);
          this.dataTestVariants.next(null);
        },
      });
  }

  public postTestVariant(testVariant: TestVariant, observer?: Observer<number>) {
    this.http.post('api/TestVariants', testVariant).subscribe({
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

  public postQuestionToTestVariant(
    testVariantId: number,
    questionId: number,
    observer?: Observer<void>,
  ) {
    this.http.post(`api/TestVariants/${testVariantId}/${questionId}`, null).subscribe({
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

  public putTestVariant(testVariant: TestVariant, observer?: Observer<void>) {
    this.http.put('api/TestVariants', testVariant).subscribe({
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

  public DeleteQuestionFromTestVariant(
    testVariantId: number,
    questionId: number,
    observer?: Observer<void>,
  ) {
    this.http.put(`api/TestVariants/${testVariantId}/${questionId}`, null).subscribe({
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

  public async DeleteTestVariantAsync(testVariantId: number, observer?: Observer<void>) {
    await this.http.delete(`api/TestVariants/${testVariantId}`).subscribe({
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
