import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import ItemService from '../utils/item.service';
import VariantOfAnswer from '../models/variant-of-answer.model';

@Injectable({ providedIn: 'root' })
export default class VariantOfAnswerService extends ItemService<VariantOfAnswer> {
  constructor(private http: HttpClient) {
    super();
  }

  public getById(id: number, observer?: Observer<VariantOfAnswer>) {
    this.http
      .get(`api/Answers/${id}`)
      .pipe(map((data) => data as VariantOfAnswer))
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

  public refreshAnswers() {
    this.http
      .get('api/Answers')
      .pipe(map((data) => data as VariantOfAnswer[]))
      .subscribe({
        next: (data: VariantOfAnswer[]) => this.subject.next(data),
        error: (err) => {
          console.error(err);
          this.subject.next(null);
        },
      });
  }

  public searchVariantsOfAnswerByQuestionName(name: string) {
    this.http
      .get(`api/Answers/search/name?name=${name}`)
      .pipe(map((data) => data as VariantOfAnswer[]))
      .subscribe({
        next: (data: VariantOfAnswer[]) => this.subject.next(data),
        error: (err) => {
          console.error(err);
          this.subject.next(null);
        },
      });
  }

  public searchVariantsOfAnswerByQuestionId(questionId: number) {
    this.http
      .get(`api/Answers/search/questionId?questionId=${questionId}`)
      .pipe(map((data) => data as VariantOfAnswer[]))
      .subscribe({
        next: (data: VariantOfAnswer[]) => this.subject.next(data),
        error: (err) => {
          console.error(err);
          this.subject.next(null);
        },
      });
  }

  public postVariantOfAnswer(variantOfAnswer: VariantOfAnswer, observer?: Observer<number>) {
    this.http.post('api/Answers', variantOfAnswer).subscribe({
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

  public putVariantOfAnswer(variantOfAnswer: VariantOfAnswer, observer?: Observer<void>) {
    this.http.put('api/Answers', variantOfAnswer).subscribe({
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

  public async DeleteVariantOfAnswerAsync(variantOfAnswerId: number, observer?: Observer<void>) {
    await this.http.delete(`api/Answers/${variantOfAnswerId}`).subscribe({
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
