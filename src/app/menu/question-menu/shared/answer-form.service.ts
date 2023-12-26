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
          this.BSFormPostCalled = false;
          this.BSPostObserver = null;
          observer.next(questionId);
        },
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
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

  public isNewQuestionSaved(): boolean {
    return !!(this.BSPostObserver !== null && this.BSFormPostCalled);
  }

  public getQuestionTypeName(): string {
    return this.basicSettingsFormService.readQuestionTypeName();
  }
}
