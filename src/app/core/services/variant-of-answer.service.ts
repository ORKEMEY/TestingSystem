import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ItemService from './item.service';
import VariantOfAnswer from '../models/variant-of-answer.model';

@Injectable({ providedIn: 'root' })
export default class VariantOfAnswerService extends ItemService<VariantOfAnswer> {
  public constructor(http: HttpClient) {
    super(http);
  }

  public getById(id: number): Observable<VariantOfAnswer> {
    return this.get<VariantOfAnswer>(`api/Answers/${id}`);
  }

  public refreshAnswers() {
    this.get<VariantOfAnswer[]>('api/Answers').subscribe({
      next: (data: VariantOfAnswer[]) => this.subject.next(data),
      error: (err) => {
        console.error(err);
        this.subject.next(null);
      },
    });
  }

  public searchVariantsOfAnswerByQuestionName(name: string) {
    this.get<VariantOfAnswer[]>(`api/Answers/search/name?name=${name}`).subscribe({
      next: (data: VariantOfAnswer[]) => this.subject.next(data),
      error: (err) => {
        console.error(err);
        this.subject.next(null);
      },
    });
  }

  public searchVariantsOfAnswerByQuestionId(questionId: number) {
    this.get<VariantOfAnswer[]>(`api/Answers/search/questionId?questionId=${questionId}`).subscribe(
      {
        next: (data: VariantOfAnswer[]) => this.subject.next(data),
        error: (err) => {
          console.error(err);
          this.subject.next(null);
        },
      },
    );
  }

  public postVariantOfAnswer(variantOfAnswer: VariantOfAnswer): Observable<number> {
    return this.post<number>('api/Answers', variantOfAnswer);
  }

  public putVariantOfAnswer(variantOfAnswer: VariantOfAnswer): Observable<void | Object> {
    return this.put('api/Answers', variantOfAnswer);
  }

  public deleteVariantOfAnswer(variantOfAnswerId: number): Observable<void | Object> {
    return this.delete(`api/Answers/${variantOfAnswerId}`);
  }
}
