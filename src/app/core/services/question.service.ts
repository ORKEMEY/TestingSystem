import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ItemService from './item.service';
import TestVariantService from './test-variant.service';
import Question from '../models/question.model';

@Injectable({ providedIn: 'root' })
export default class QuestionService extends ItemService<Question> {
  public constructor(http: HttpClient, private testVariantService: TestVariantService) {
    super(http);
  }

  public getById(id: number): Observable<Question> {
    return this.get<Question>(`api/Questions/${id}`);
  }

  public refreshQuestions() {
    this.get<Question[]>('api/Questions').subscribe({
      next: (data: Question[]) => this.subject.next(data),
      error: (err) => {
        console.error(err);
        this.subject.next(null);
      },
    });
  }

  public searchQuestionsByTestVarId(id: number) {
    this.get<Question[]>(`api/Questions/search?testVariantId=${id}`).subscribe({
      next: (data: Question[]) => this.subject.next(data),
      error: (err) => {
        console.error(err);
        this.subject.next(null);
      },
    });
  }

  public postQuestion(question: Question): Observable<number> {
    return this.post<number>('api/Questions', question);
  }

  public postQuestionToTestVariant(
    testVariantId: number,
    questionId: number,
  ): Observable<void | Object> {
    return this.testVariantService.postQuestionToTestVariant(testVariantId, questionId);
  }

  public putQuestion(question: Question): Observable<void | Object> {
    return this.put('api/Questions', question);
  }

  public deleteQuestionFromTestVariant(
    testVariantId: number,
    questionId: number,
  ): Observable<void | Object> {
    return this.testVariantService.deleteQuestionFromTestVariant(testVariantId, questionId);
  }

  public deleteQuestion(questiontId: number): Observable<void | Object> {
    return this.delete(`api/Questions/${questiontId}`);
  }
}
