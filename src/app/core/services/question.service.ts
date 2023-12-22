import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import Question from '../models/question.model';

@Injectable({ providedIn: 'root' })
export default class QuestionService {
  private dataQuestions: BehaviorSubject<Question[] | null>;

  public dataQuestions$: Observable<Question[] | null>;

  constructor(private http: HttpClient) {
    this.dataQuestions = new BehaviorSubject<Question[] | null>(null);
    this.dataQuestions$ = this.dataQuestions.asObservable();
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
        next: (data: Question[]) => this.dataQuestions.next(data),
        error: (err) => {
          console.error(err);
          this.dataQuestions.next(null);
        },
      });
  }

  public searchQuestionsByTestVarId(id: number) {
    this.http
      .get(`api/Questions/search?testVariantId=${id}`)
      .pipe(map((data) => data as Question[]))
      .subscribe({
        next: (data: Question[]) => this.dataQuestions.next(data),
        error: (err) => {
          console.error(err);
          this.dataQuestions.next(null);
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
