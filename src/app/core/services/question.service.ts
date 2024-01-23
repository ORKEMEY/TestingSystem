import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import ItemService from '../utils/item.service';
import TestVariantService from './test-variant.service';
import Question from '../models/question.model';

@Injectable({ providedIn: 'root' })
export default class QuestionService extends ItemService<Question> {
  constructor(private http: HttpClient, private testVariantService: TestVariantService) {
    super();
  }

  public getById(id: number, observer?: Observer<Question>) {
    this.http
      .get(`api/Questions/${id}`)
      .pipe(map((data) => data as Question))
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

  public refreshQuestions() {
    this.http
      .get('api/Questions')
      .pipe(map((data) => data as Question[]))
      .subscribe({
        next: (data: Question[]) => this.subject.next(data),
        error: (err) => {
          console.error(err);
          this.subject.next(null);
        },
      });
  }

  public searchQuestionsByTestVarId(id: number) {
    this.http
      .get(`api/Questions/search?testVariantId=${id}`)
      .pipe(map((data) => data as Question[]))
      .subscribe({
        next: (data: Question[]) => this.subject.next(data),
        error: (err) => {
          console.error(err);
          this.subject.next(null);
        },
      });
  }

  public postQuestion(question: Question, observer?: Observer<number>) {
    this.http.post('api/Questions', question).subscribe({
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
    this.testVariantService.postQuestionToTestVariant(testVariantId, questionId, observer);
  }

  public putQuestion(question: Question, observer?: Observer<void>) {
    this.http.put('api/Questions', question).subscribe({
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
    this.testVariantService.DeleteQuestionFromTestVariant(testVariantId, questionId, observer);
  }

  public async DeleteQuestionAsync(questiontId: number, observer?: Observer<void>) {
    await this.http.delete(`api/Questions/${questiontId}`).subscribe({
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
