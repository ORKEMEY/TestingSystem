import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import ItemService from './item.service';
import TestVariant from '../models/test-variant.model';

@Injectable({ providedIn: 'root' })
export default class TestVariantService extends ItemService<TestVariant> {
  public constructor(http: HttpClient) {
    super(http);
  }

  public getById(id: number): Observable<TestVariant> {
    return this.get<TestVariant>(`api/TestVariants/${id}`);
  }

  public refreshTestVariants() {
    this.loading.value = true;
    this.get<TestVariant[]>('api/TestVariants')
      .pipe(
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
    this.get<TestVariant[]>(`api/TestVariants/search?testId=${id}`)
      .pipe(
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

  public postTestVariant(testVariant: TestVariant): Observable<number> {
    return this.post<number>('api/TestVariants', testVariant);
  }

  public postQuestionToTestVariant(
    testVariantId: number,
    questionId: number,
  ): Observable<void | Object> {
    return this.post<void | Object>(`api/TestVariants/${testVariantId}/${questionId}`, null);
  }

  public putTestVariant(testVariant: TestVariant): Observable<void | Object> {
    return this.put('api/TestVariants', testVariant);
  }

  public deleteQuestionFromTestVariant(
    testVariantId: number,
    questionId: number,
  ): Observable<void | Object> {
    return this.put(`api/TestVariants/${testVariantId}/${questionId}`, null);
  }

  public deleteTestVariant(testVariantId: number): Observable<void | Object> {
    return this.delete(`api/TestVariants/${testVariantId}`);
  }
}
