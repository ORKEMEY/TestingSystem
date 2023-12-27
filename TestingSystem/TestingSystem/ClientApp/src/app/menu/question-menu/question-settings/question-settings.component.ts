import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';
import TestVariantQuestionAddingService from '../../shared/test-var-question-adding.service';
import QuestionService from '../../../core/services/question.service';
import AnswerFormService from '../shared/answer-form.service';
import Question from '../../../core/models/question.model';
import Alert from '../../../core/alert';

@Component({
  selector: 'question-settings-component',
  templateUrl: './question-settings.component.html',
  styleUrls: ['./question-settings.component.css'],
})
export default class QuestionSettingsComponent {
  @ViewChild('alertQueryDiv', { static: false })
  alertQueryDiv: ElementRef | undefined;

  @ViewChild('alertDifficultyDiv', { static: false })
  alertDifficultyDiv: ElementRef | undefined;

  @ViewChild('alertDiscriminationDiv', { static: false })
  alertDiscriminationDiv: ElementRef | undefined;

  @ViewChild('alertPseudoGuessingDiv', { static: false })
  alertPseudoGuessingDiv: ElementRef | undefined;

  @ViewChild('alertCommonDiv', { static: false })
  alertCommonDiv: ElementRef | undefined;

  isWarningVisible: Boolean = false;

  isInfoVisible: Boolean = false;

  warningMessage: string = '';

  infoMessage: string = '';

  private id: number = 0;

  public get form(): FormGroup {
    return this.basicSettingsForm.form;
  }

  private question: Question = null;

  public get Question(): Question {
    if (this.id !== 0 && this.question === null) {
      this.loadQuestion();
    }
    return this.question;
  }

  public set Question(item: Question) {
    this.question = item;
    this.basicSettingsForm.Question = this.question;
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
    this.id = Number.parseInt(this.activatedRoute.parent.snapshot.params.id, 10);
    this.loadQuestion();
  }

  private loadQuestion() {
    if (this.id !== 0) {
      this.questionService.getById(this.id, {
        next: (item) => {
          this.Question = item;
        },
        error: (err) => this.Warn(err),
        complete: () => console.log('comlete'),
      } as Observer<Question>);
    } else {
      this.Question = null;
    }
  }

  onQueryChange() {
    const res = this.basicSettingsForm.validateQuery();

    if (res === null) {
      Alert.hideAlertMessage(this.alertQueryDiv);
    } else {
      Alert.alertMessage(this.alertQueryDiv, res);
    }
  }

  onDifficultyChange() {
    const res = this.basicSettingsForm.validateDifficulty();

    if (res === null) {
      Alert.hideAlertMessage(this.alertDifficultyDiv);
    } else {
      Alert.alertMessage(this.alertDifficultyDiv, res);
    }
  }

  onDiscriminationChange() {
    const res = this.basicSettingsForm.validateDiscrimination();

    if (res === null) {
      Alert.hideAlertMessage(this.alertDiscriminationDiv);
    } else {
      Alert.alertMessage(this.alertDiscriminationDiv, res);
    }
  }

  onPseudoGuessingChange() {
    const res = this.basicSettingsForm.validatePseudoGuessing();

    if (res === null) {
      Alert.hideAlertMessage(this.alertPseudoGuessingDiv);
    } else {
      Alert.alertMessage(this.alertPseudoGuessingDiv, res);
    }
  }

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
        this.router.navigate([`/menus/menu/questionmenu/question/${itemId}/answerseditor`]);
      },
      error: (errMsg: string) => this.Warn(errMsg),
    } as Observer<number>);
    this.Info("Question's saved and will be created after adding answers!");
  }

  private submitPut() {
    this.basicSettingsForm.submitPut(this.id, {
      next: () => this.Info('Changes saved!'),
      error: (errMsg: string) => this.Warn(errMsg),
    } as Observer<void>);
  }

  Warn(msg: string) {
    this.warningMessage = msg;
    this.isWarningVisible = true;
  }

  hideWarning() {
    this.warningMessage = '';
    this.isWarningVisible = false;
  }

  Info(msg: string) {
    this.infoMessage = msg;
    this.isInfoVisible = true;
  }

  hideInfo() {
    this.infoMessage = '';
    this.isInfoVisible = false;
  }
}
