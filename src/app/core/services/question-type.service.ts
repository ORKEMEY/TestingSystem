import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import ItemService from '../utils/item.service';
import QuestionType from '../models/question-type.model';

@Injectable({ providedIn: 'root' })
export default class QuestionTypeService extends ItemService<QuestionType> {
  constructor(private http: HttpClient) {
    super();
  }

  public getById(id: number, observer?: Observer<QuestionType>) {
    this.http
      .get(`api/QuestionTypes/${id}`)
      .pipe(map((data) => data as QuestionType))
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

  public refreshQuestionTypes() {
    this.http
      .get('api/QuestionTypes')
      .pipe(map((data) => data as QuestionType[]))
      .subscribe({
        next: (data: QuestionType[]) => this.subject.next(data),
        error: (err) => {
          console.error(err);
          this.subject.next(null);
        },
      });
  }

  public searchQuestionTypesByName(name: string, observer?: Observer<QuestionType>) {
    this.http
      .get(`api/QuestionTypes/search?name=${name}`)
      .pipe(map((data) => data as QuestionType))
      .subscribe({
        next: (data: QuestionType) => observer?.next?.(data),
        error: (err) => {
          console.error(err);
          observer?.error?.(err);
        },
      });
  }

  public postQuestionType(questionType: QuestionType, observer?: Observer<number>) {
    this.http.post('api/QuestionTypes', questionType).subscribe({
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

  public putQuestionType(questionType: QuestionType, observer?: Observer<void>) {
    this.http.put('api/QuestionTypes', questionType).subscribe({
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

  public async DeleteQuestionTypeAsync(questionTypeId: number, observer?: Observer<void>) {
    await this.http.delete(`api/QuestionTypes/${questionTypeId}`).subscribe({
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
