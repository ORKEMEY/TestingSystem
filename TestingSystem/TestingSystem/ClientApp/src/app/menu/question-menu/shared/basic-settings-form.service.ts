import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import Question from '../../../core/models/question.model';
import QuestionType from '../../../core/models/question-type.model';
import Model from '../../../core/models/model.model';
import QuestionService from '../../../core/services/question.service';
import QuestionTypeService from '../../../core/services/question-type.service';
import ModelService from '../../../core/services/model.service';

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
    private modelService: ModelService,
  ) {
    this.form = new FormGroup({
      Query: new FormControl('', [Validators.required]),
      QuestionType: new FormControl('Single Choise'),
      Difficulty: new FormControl('', [
        Validators.required,
        Validators.min(-10),
        Validators.max(10),
      ]),
      Discrimination: new FormControl('', [Validators.min(0.001), Validators.max(20)]),
      PseudoGuessing: new FormControl('', [Validators.min(0), Validators.max(1)]),
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
      return "Difficulty parameter cann't less than -10!";
    }

    if (this.form.controls.Difficulty.errors?.max) {
      return "Difficulty parameter cann't greater than 10!";
    }
    return null;
  }

  public validateDiscrimination(): string | null {
    if (this.form.controls.Discrimination.valid || this.form.controls.Discrimination.pristine) {
      return null;
    }

    if (this.form.controls.Discrimination.errors?.min) {
      return "Discrimination parameter cann't be less than 0.001!";
    }

    if (this.form.controls.Discrimination.errors?.max) {
      return "Discrimination parameter cann't be greater than 20!";
    }

    return null;
  }

  public validatePseudoGuessing(): string | null {
    if (this.form.controls.PseudoGuessing.valid || this.form.controls.PseudoGuessing.pristine) {
      return null;
    }

    if (this.form.controls.PseudoGuessing.errors?.min) {
      return "Pseudo-guessing parameter cann't be less than 0!";
    }

    if (this.form.controls.PseudoGuessing.errors?.max) {
      return "Pseudo-guessing parameter cann't be greater than 1!";
    }

    return null;
  }

  submitPost(observer?: Observer<number>) {
    if (!this.form.valid) {
      throw new Error('submit on invalid form');
    } else {
      this.readFormValsAsync().then((question) => {
        this.questionService.postQuestion(question, observer);
      });
    }
  }

  submitPut(id: number, observer?: Observer<void>) {
    if (!this.form.valid) {
      throw new Error('submit on invalid form');
    } else {
      this.readFormValsAsync().then((question) => {
        question.id = id;
        this.questionService.putQuestion(question, observer);
      });
    }
  }

  private async readFormValsAsync(): Promise<Question> {
    if (!this.form.valid) return null;

    const query = this.form.controls.Query.value;
    const difficulty = this.form.controls.Difficulty.value;
    const discrimination = this.form.controls.Discrimination.value || 1;
    const pseudoGuessing = this.form.controls.PseudoGuessing.value || 0;

    let questionType: QuestionType;
    const qtProm = this.readQuestionTypeAsync().then((res) => {
      questionType = res;
    });

    let model: Model;
    const mProm = this.readModelAsync().then((res) => {
      model = res;
    });

    return Promise.all([qtProm, mProm]).then(() => {
      const question = new Question(query);
      question.bParam = difficulty;
      question.aParam = discrimination;
      question.cParam = pseudoGuessing;
      question.modelId = model.id as number;
      question.questionTypeId = questionType.id as number;
      return question;
    });
  }

  private async readQuestionTypeAsync(): Promise<QuestionType> {
    let questionType: QuestionType;
    const questionTypeName = this.form.controls.QuestionType.value;

    return new Promise<QuestionType>((res) => {
      this.questionTypeService.dataQuestionTypes$.subscribe((data: QuestionType[] | null) => {
        questionType = data?.[0];
        res(questionType);
      });
      this.questionTypeService.searchQuestionTypesByName(questionTypeName);
    });
  }

  private async readModelAsync(): Promise<Model> {
    const discrimination = this.form.controls.Discrimination.value;
    const pseudoGuessing = this.form.controls.PseudoGuessing.value;

    let model: Model;
    let modelName = '1PL';
    if (discrimination !== '' && pseudoGuessing === '') {
      modelName = '2PL';
    } else if (discrimination !== '' && pseudoGuessing !== '') {
      modelName = '3PL';
    }

    return new Promise<Model>((res) => {
      this.modelService.dataModels$.subscribe((data: Model[] | null) => {
        model = data?.[0];
        res(model);
      });
      this.modelService.searchModelsByName(modelName);
    });
  }

  public readQuestionTypeName(): string {
    return this.form.controls.QuestionType.value as string;
  }

  private setFormVals(question: Question | null): void {
    this.form.controls.Query.setValue(question?.query || '');
    this.form.controls.QuestionType.setValue(question?.questionType?.name || 'Single Choise');
    this.form.controls.Difficulty.setValue(question?.bParam || '');
    this.form.controls.Discrimination.setValue(question?.aParam || '');
    this.form.controls.PseudoGuessing.setValue(question?.cParam || '');
  }
}
