import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';
import AnswerEditorFormService from './answer-editor-form.service';
import BasicSettingsFormService from './basic-settings-form.service';

@Injectable()
export default class AnswerFormService {
  public readonly form: FormGroup;

  private BSPostObserver: Observer<number> = null;

  private BSFormPostCalled: Boolean = false;

  constructor(
    public readonly answerEditorFormService: AnswerEditorFormService,
    public readonly basicSettingsFormService: BasicSettingsFormService,
  ) {}

  submitAnswerEditorForm(observer?: Observer<number>) {
    if (this.isNewQuestionSaved()) {
      this.basicSettingsFormService.submitPost({
        next: (questionId) => {
          this.answerEditorFormService.submit(questionId, observer);
          this.BSPostObserver.next(questionId);
          this.clear();
        },
        error: (err) => {
          observer.error(err);
          this.clear();
        },
        complete: () => {
          observer.complete();
          this.clear();
        },
      });
    }
  }

  submitBasicSettingsFormPost(observer?: Observer<number>) {
    this.BSFormPostCalled = true;
    this.BSPostObserver = observer;
  }

  submitBasicSettingsFormPut(id: number, observer?: Observer<void>) {
    this.basicSettingsFormService.submitPut(id, observer);
  }

  clear() {
    this.BSFormPostCalled = false;
    this.BSPostObserver = null;
  }

  public isNewQuestionSaved(): boolean {
    return !!(this.BSPostObserver !== null && this.BSFormPostCalled);
  }

  public getQuestionTypeName(): string {
    return this.basicSettingsFormService.readQuestionTypeName();
  }
}
