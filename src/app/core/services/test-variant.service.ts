import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import ItemService from '../utils/item.service';
import TestVariant from '../models/test-variant.model';

@Injectable({ providedIn: 'root' })
export default class TestVariantService extends ItemService<TestVariant> {
  constructor(private http: HttpClient) {
    super();
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
    this.loading.value = true;
    this.http
      .get('api/TestVariants')
      .pipe(
        map((data) => data as TestVariant[]),
        tap(() => {
          this.loading.value = false;
        }),
      )
      .subscribe({
        next: (data: TestVariant[]) => this.subject.next(data),
        error: (err) => {
          console.error(err);
          this.subject.next(null);
        },
      });
  }

  public searchTestVariantsByTestId(id: number) {
    this.loading.value = true;
    this.http
      .get(`api/TestVariants/search?testId=${id}`)
      .pipe(
        map((data) => data as TestVariant[]),
        tap(() => {
          this.loading.value = false;
        }),
      )
      .subscribe({
        next: (data: TestVariant[]) => this.subject.next(data),
        error: (err) => {
          console.error(err);
          this.subject.next(null);
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
