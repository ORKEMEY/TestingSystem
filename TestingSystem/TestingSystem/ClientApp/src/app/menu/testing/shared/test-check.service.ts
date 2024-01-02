import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Observer } from 'rxjs';
import TestVariant from '../../../core/models/test-variant.model';
import Question from '../../../core/models/question.model';
import Answer from '../../../core/models/variant-of-answer.model';
import TestService from '../../../core/services/test.service';
import Test from '../../../core/models/test.model';
import Log from '../../../core/models/log.model';
import TestResult from '../../../core/models/test-result.model';
// import CheckResponse from '../../../core/models/check-response.model';
import AnswerFormControl from './answer-form-control';

type QuestionForm = { form: FormGroup; questionId: number };

@Injectable()
export default class TestCheckService {
  private forms: QuestionForm[] = [];

  constructor(private testService: TestService) {}

  getForm(questionId: number): FormGroup {
    return this.forms.find((el) => el.questionId === questionId)?.form;
  }

  addForm(form: FormGroup, questionId: number) {
    const qf = this.getForm(questionId);

    if (!qf) {
      this.forms.push({ form, questionId });
    }
  }

  submit(test: Test, testVariant: TestVariant, log: Log, observer?: Observer<TestResult>) {
    let testVar: TestVariant;
    Object.assign(testVar, testVariant);
    testVar.questions = [];

    this.forms.forEach((qf) => {
      const question = new Question('');
      question.id = qf.questionId;
      (qf.form.controls?.Answers as FormArray)?.controls?.forEach((control) => {
        const af: AnswerFormControl = control as AnswerFormControl;

        if (af.AnswerType === 'Single Choise' || af.AnswerType === 'True / False') {
          if (af.value === true) {
            const answer = new Answer('', question.id);
            answer.id = af.AnswerId;
            question.answers.push(answer);
          }
        } else {
          const answer = new Answer(af.value, question.id);
          answer.id = af.AnswerId;
          question.answers.push(answer);
        }
      });
      testVar.questions.push(question);
    });

    let sendTest: Test;
    Object.assign(sendTest, test);
    sendTest.testVariants = [testVar];
    this.testService.checkTest(sendTest, log, observer);

    this.reset();
  }

  public reset() {
    this.forms = [];
  }
}
