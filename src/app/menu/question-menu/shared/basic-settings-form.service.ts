import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import Question from '../../../core/models/question.model';
import QuestionType from '../../../core/models/question-type.model';
import QuestionService from '../../../core/services/question.service';
import QuestionTypeService from '../../../core/services/question-type.service';

@Injectable()
export default class BasicSettingsFormService {
  public readonly form: FormGroup;

  private question: Question = null;

  public get Question(): Question {
    return this.question;
  }

  public set Question(setQuestion) {
    this.question = setQuestion;
    this.setFormVals(this.question);
  }

  constructor(
    private questionService: QuestionService,
    private questionTypeService: QuestionTypeService,
  ) {
    this.form = new FormGroup({
      Query: new FormControl('', [Validators.required]),
      QuestionType: new FormControl('Single Choise'),
      Difficulty: new FormControl('', [
        Validators.required,
        Validators.min(-10),
        Validators.max(10),
      ]),
    });
  }

  public validateQuery(): string | null {
    if (this.form.controls.Query.valid || this.form.controls.Query.pristine) {
      return null;
    }

    if (this.form.controls.Query.errors?.required) {
      return "Query cann't be empty!";
    }
    return null;
  }

  public validateDifficulty(): string | null {
    if (this.form.controls.Difficulty.valid || this.form.controls.Difficulty.pristine) {
      return null;
    }

    if (this.form.controls.Difficulty.errors?.required) {
      return "Difficulty parameter cann't be empty!";
    }

    if (this.form.controls.Difficulty.errors?.min) {
      return "Difficulty parameter cann't be less than -10!";
    }

    if (this.form.controls.Difficulty.errors?.max) {
      return "Difficulty parameter cann't be greater than 10!";
    }
    return null;
  }

  submitPost(observer?: Observer<number>) {
    if (!this.form.valid) {
      throw new Error('submit on invalid form');
    } else {
      this.readFormValsAsync().then(
        (question) => {
          this.questionService.postQuestion(question).subscribe(observer);
        },
        (rej) => {
          observer.error(rej);
        },
      );
    }
  }

  submitPut(id: number, observer?: Observer<void>) {
    if (!this.form.valid) {
      throw new Error('submit on invalid form');
    } else {
      this.readFormValsAsync().then(
        (question) => {
          question.id = id;
          this.questionService.putQuestion(question).subscribe(observer);
        },
        (rej) => {
          observer.error(rej);
        },
      );
    }
  }

  private async readFormValsAsync(): Promise<Question> {
    if (!this.form.valid) return null;

    const query = this.form.controls.Query.value;
    const difficulty = this.form.controls.Difficulty.value;

    let questionType: QuestionType;
    return this.readQuestionTypeAsync()
      .then(
        (res) => {
          questionType = res;
        },
        (rej) => {
          return Promise.reject(rej);
        },
      )
      .then(() => {
        const question = new Question(query);
        question.questionTypeId = questionType.id as number;
        question.difficulty = difficulty;
        return question;
      });
  }

  private async readQuestionTypeAsync(): Promise<QuestionType> {
    let questionType: QuestionType;
    const questionTypeName = this.form.controls.QuestionType.value;

    return new Promise<QuestionType>((res, rej) => {
      this.questionTypeService.searchQuestionTypeByName(questionTypeName).subscribe({
        next: (data: QuestionType) => {
          if (!data) {
            rej(new Error('Specified question type not found'));
          } else {
            questionType = data;
            res(questionType);
          }
        },
        error: (err) => rej(err),
      } as Observer<QuestionType>);
    });
  }

  public readQuestionTypeName(): string {
    return this.form.controls.QuestionType.value as string;
  }

  private setFormVals(question: Question | null): void {
    this.form.controls.Query.setValue(question?.query || '');
    this.form.controls.QuestionType.setValue(question?.questionType?.name || 'Single Choise');
    this.form.controls.Difficulty.setValue(question?.difficulty ?? '');
  }
}
