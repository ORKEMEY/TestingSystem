import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ItemService from './item.service';
import QuestionType from '../models/question-type.model';

@Injectable({ providedIn: 'root' })
export default class QuestionTypeService extends ItemService<QuestionType> {
  public constructor(http: HttpClient) {
    super(http);
  }

  public getById(id: number): Observable<QuestionType> {
    return this.get<QuestionType>(`api/QuestionTypes/${id}`);
  }

  public refreshQuestionTypes() {
    this.get<QuestionType[]>('api/QuestionTypes').subscribe({
      next: (data: QuestionType[]) => this.subject.next(data),
      error: (err) => {
        console.error(err);
        this.subject.next(null);
      },
    });
  }

  public searchQuestionTypeByName(name: string): Observable<QuestionType> {
    return this.get<QuestionType>(`api/QuestionTypes/search?name=${name}`);
  }

  public postQuestionType(questionType: QuestionType): Observable<number> {
    return this.post<number>('api/QuestionTypes', questionType);
  }

  public putQuestionType(questionType: QuestionType): Observable<void | Object> {
    return this.put('api/QuestionTypes', questionType);
  }

  public deleteQuestionType(questionTypeId: number): Observable<void | Object> {
    return this.delete(`api/QuestionTypes/${questionTypeId}`);
  }
}
