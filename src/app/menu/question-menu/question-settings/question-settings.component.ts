import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Observer } from 'rxjs';
import TestVariantQuestionAddingService from '../../shared/test-var-question-adding.service';
import QuestionService from '../../../core/services/question.service';
import AnswerFormService from '../shared/answer-form.service';
import Question from '../../../core/models/question.model';
import MessageBox from '../../../core/utils/msg-box';
import Alert from '../../../core/utils/alert';

@Component({
  selector: 'question-settings-component',
  templateUrl: './question-settings.component.html',
  styleUrls: ['./question-settings.component.css'],
  animations: [fadeInOnEnterAnimation({ duration: 130 })],
})
export default class QuestionSettingsComponent extends MessageBox {
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
    super();
    this.activatedRoute.parent.params.subscribe((params) => {
      this.id = Number.parseInt(params.id, 10);
      this.loadQuestion();
    });
  }

  private loadQuestion() {
    if (this.id !== 0) {
      this.questionService.getById(this.id, {
        next: (item) => {
          this.Question = item;
        },
        error: (err) => {
          if (typeof err !== 'string') this.Warn("Ooops, something went wrong! Couldn't load data");
          else this.Warn(err);
        },
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

  validateForm() {
    this.onQueryChange();
    this.onDifficultyChange();
    this.onDiscriminationChange();
    this.onPseudoGuessingChange();
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
        this.Info("Question's successfully created!");
      },
      error: (errMsg: string) => {
        if (typeof errMsg !== 'string')
          this.Warn("Ooops, something went wrong! Couldn't create question");
        else this.Warn(errMsg);
      },
    } as Observer<number>);
    this.Info("Question's saved and will be created after adding answers!");
  }

  private submitPut() {
    this.basicSettingsForm.submitPut(this.id, {
      next: () => {
        this.Info('Changes saved!');
        this.loadQuestion();
      },
      error: (errMsg: string) => {
        if (typeof errMsg !== 'string')
          this.Warn("Ooops, something went wrong! Couldn't save changes");
        else this.Warn(errMsg);
      },
    } as Observer<void>);
  }
}
