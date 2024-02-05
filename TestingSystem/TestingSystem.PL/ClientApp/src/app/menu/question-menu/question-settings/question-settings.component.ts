import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Observer } from 'rxjs';
import TestVariantQuestionAddingService from '../../shared/test-var-question-adding.service';
import QuestionService from '../../../core/services/question.service';
import AnswerFormService from '../shared/answer-form.service';
import Question from '../../../core/models/question.model';
import WarningBoxHandler from '../../../shared/utils/warning-box-handler';
import InfoBoxHandler from '../../../shared/utils/info-box-handler';
import AlertBoxHandler from '../../../shared/utils/alert-box-handler';

@Component({
  selector: 'question-settings-component',
  templateUrl: './question-settings.component.html',
  styleUrls: ['./question-settings.component.scss'],
  animations: [fadeInOnEnterAnimation({ duration: 130 })],
})
export default class QuestionSettingsComponent {
  // #region msgBoxes
  QueryAlertBox: AlertBoxHandler = new AlertBoxHandler();

  DifficultyAlertBox: AlertBoxHandler = new AlertBoxHandler();

  DiscriminationAlertBox: AlertBoxHandler = new AlertBoxHandler();

  PseudoGuessingAlertBox: AlertBoxHandler = new AlertBoxHandler();

  WarningBox: WarningBoxHandler = new WarningBoxHandler();

  InfoBox: InfoBoxHandler = new InfoBoxHandler();

  // #endregion

  private id: number = 0;

  public get form(): FormGroup {
    return this.basicSettingsForm.form;
  }

  private question: Question = null;

  public get Question(): Question {
    return this.question;
  }

  public set Question(item: Question) {
    this.question = item;
    this.basicSettingsForm.Question = this.question;
    this.validateForm();
  }

  private get basicSettingsForm() {
    return this.answerFormService.basicSettingsFormService;
  }

  constructor(
    private answerFormService: AnswerFormService,
    private questionService: QuestionService,
    private questionAddingService: TestVariantQuestionAddingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.id = Number.parseInt(params.id, 10);
      this.loadQuestion();
    });
  }

  private loadQuestion() {
    if (this.id !== 0) {
      this.questionService.getById(this.id).subscribe({
        next: (item) => {
          this.Question = item;
        },
        error: (err) => {
          if (typeof err !== 'string')
            this.WarningBox.Warn("Ooops, something went wrong! Couldn't load data");
          else this.WarningBox.Warn(err);
        },
      } as Observer<Question>);
    } else {
      this.Question = null;
    }
  }

  // #region validation

  onQueryChange() {
    const res = this.basicSettingsForm.validateQuery();

    if (!res) {
      this.QueryAlertBox.hideAlert();
    } else {
      this.QueryAlertBox.Alert(res);
    }
  }

  onDifficultyChange() {
    const res = this.basicSettingsForm.validateDifficulty();

    if (!res) {
      this.DifficultyAlertBox.hideAlert();
    } else {
      this.DifficultyAlertBox.Alert(res);
    }
  }

  onDiscriminationChange() {
    const res = this.basicSettingsForm.validateDiscrimination();

    if (!res) {
      this.DiscriminationAlertBox.hideAlert();
    } else {
      this.DiscriminationAlertBox.Alert(res);
    }
  }

  onPseudoGuessingChange() {
    const res = this.basicSettingsForm.validatePseudoGuessing();

    if (!res) {
      this.PseudoGuessingAlertBox.hideAlert();
    } else {
      this.PseudoGuessingAlertBox.Alert(res);
    }
  }

  validateForm() {
    this.onQueryChange();
    this.onDifficultyChange();
    this.onDiscriminationChange();
    this.onPseudoGuessingChange();
  }
  // #endregion

  // #region submition
  submit() {
    try {
      if (this.id === 0) {
        this.submitPost();
      } else {
        this.submitPut();
      }
    } catch (error) {
      console.error(error);
    }
  }

  private submitPost() {
    this.answerFormService.submitBasicSettingsFormPost({
      next: (itemId) => {
        if (this.questionAddingService.isActivated) {
          this.questionAddingService.pushQuestionId(itemId);
        }
        this.InfoBox.Info("Question's successfully created!");
      },
      error: (errMsg: string) => {
        if (typeof errMsg !== 'string')
          this.WarningBox.Warn("Ooops, something went wrong! Couldn't create question");
        else this.WarningBox.Warn(errMsg);
      },
    } as Observer<number>);
    this.InfoBox.Info("Question's saved and will be created after adding answers!");
  }

  private submitPut() {
    this.basicSettingsForm.submitPut(this.id, {
      next: () => {
        this.InfoBox.Info('Changes saved!');
        this.loadQuestion();
      },
      error: (errMsg: string) => {
        if (typeof errMsg !== 'string')
          this.WarningBox.Warn("Ooops, something went wrong! Couldn't save changes");
        else this.WarningBox.Warn(errMsg);
      },
    } as Observer<void>);
  }
  // #endregion
}
