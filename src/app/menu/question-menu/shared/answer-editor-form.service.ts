import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import VariantOfAnswer from '../../../core/models/variant-of-answer.model';
import VariantOfAnswerService from '../../../core/services/variant-of-answer.service';

@Injectable()
export default class AnswerEditorFormService {
  public readonly form: FormGroup;

  constructor(private variantOfAnswerService: VariantOfAnswerService) {
    this.form = new FormGroup({
      Answer: new FormControl('', [Validators.required]),
      IsCorrect: new FormControl(''),
    });
  }

  public validateAnswer(): string | null {
    if (this.form.controls.Answer.valid || this.form.controls.Answer.pristine) {
      return null;
    }

    if (this.form.controls.Answer.errors?.required) {
      return "Answer cann't be empty!";
    }
    return null;
  }

  submit(questionId: number, observer?: Observer<number>) {
    if (!this.form.valid) {
      throw new Error('submit on invalid form');
    } else {
      const answer = this.readFormVals();
      answer.questionId = questionId;
      this.variantOfAnswerService.postVariantOfAnswer(answer, {
        next: (num) => {
          this.clearForm();
          observer.next(num);
        },
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
    }
  }

  private clearForm() {
    this.form.controls.Answer.setValue('');
    this.form.controls.IsCorrect.setValue('');
  }

  private readFormVals(): VariantOfAnswer {
    const answer = this.form.controls.Answer.value;
    const isCorrect: boolean = !!this.form.controls.IsCorrect.value;

    const varOfAnswer = new VariantOfAnswer(answer);
    varOfAnswer.isCorrect = isCorrect;
    return varOfAnswer;
  }
}
