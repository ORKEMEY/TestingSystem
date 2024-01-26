import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';
import TestVariant from '../../../core/models/test-variant.model';
import Question from '../../../core/models/question.model';
import Answer from '../../../core/models/variant-of-answer.model';
import TestService from '../../../core/services/test.service';
import Test from '../../../core/models/test.model';
import Log from '../../../core/models/log.model';

type QuestionForm = { form: FormGroup; question: Question };

@Injectable()
export default class TestCheckService {
  private forms: QuestionForm[] = [];

  constructor(private testService: TestService) {}

  getForm(questionId: number): FormGroup {
    return this.forms.find((el) => el.question.id === questionId)?.form;
  }

  addForm(form: FormGroup, question: Question) {
    const qf = this.getForm(question.id as number);

    if (!qf) {
      this.forms.push({ form, question });
    }
  }

  submit(test: Test, testVariant: TestVariant, log: Log, observer?: Observer<Log>) {
    const testVar: TestVariant = new TestVariant(0, 0);
    Object.assign(testVar, testVariant);
    testVar.questions = [];

    this.forms.forEach((qf) => {
      if (qf.form.pristine) {
        return;
      }
      const question = new Question('');
      question.answers = [];
      question.id = qf.question.id;

      const value = qf.form.controls?.Answer.value; // answer id

      if (
        qf.question.questionType.name === 'Single Choise' ||
        qf.question.questionType.name === 'True / False'
      ) {
        const answer = new Answer('', question.id);
        answer.id = value;
        question.answers.push(answer);
      } else {
        const answer = new Answer(value, question.id);
        question.answers.push(answer);
      }
      testVar.questions.push(question);
    });

    const sendTest: Test = new Test();
    Object.assign(sendTest, test);
    sendTest.testVariants = [testVar];
    this.testService.checkTest(sendTest, log).subscribe(observer);

    this.reset();
  }

  public reset() {
    this.forms = [];
  }
}
