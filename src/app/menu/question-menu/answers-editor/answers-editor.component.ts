import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Observer, Subscription, tap } from 'rxjs';
import AnswerFormService from '../shared/answer-form.service';
import VariantOfAnswerService from '../../../core/services/variant-of-answer.service';
import VariantOfAnswer from '../../../core/models/variant-of-answer.model';
import QuestionService from '../../../core/services/question.service';
import Question from '../../../core/models/question.model';
import WarningBoxHandler from '../../../shared/utils/warning-box-handler';
import InfoBoxHandler from '../../../shared/utils/info-box-handler';
import AlertBoxHandler from '../../../shared/utils/alert-box-handler';
import LoadingState from '../../../shared/utils/loading-state';

@Component({
  selector: 'answers-editor-component',
  templateUrl: './answers-editor.component.html',
  styleUrls: ['./answers-editor.component.scss'],
  animations: [fadeInOnEnterAnimation({ duration: 130 })],
})
export default class AnswersEditorComponent implements OnInit, OnDestroy {
  private answersSub: Subscription;

  ListAlertBox: AlertBoxHandler = new AlertBoxHandler();

  AnswerAlertBox: AlertBoxHandler = new AlertBoxHandler();

  WarningBox: WarningBoxHandler = new WarningBoxHandler();

  InfoBox: InfoBoxHandler = new InfoBoxHandler();

  loadingState: LoadingState = new LoadingState(true);

  private questionId: number = 0;

  public get form(): FormGroup {
    return this.answerEditorFormService.form;
  }

  public Question: Question = null;

  public answers: VariantOfAnswer[] | null;

  private get answerEditorFormService() {
    return this.answerFormService.answerEditorFormService;
  }

  constructor(
    private variantOfAnswerService: VariantOfAnswerService,
    private questionService: QuestionService,
    private answerFormService: AnswerFormService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.answersSub = this.variantOfAnswerService.value$
      .pipe(
        tap({
          next: () => this.loadingState.stopLoading(),
          error: () => this.loadingState.stopLoading(),
        }),
      )
      .subscribe((data: VariantOfAnswer[] | null) => {
        this.answers = data;
        this.checkCollection();
      });
    this.activatedRoute.parent.params.subscribe((params) => {
      this.questionId = Number.parseInt(params.id, 10);
      if (this.questionId !== 0) {
        this.loadQuestion().then(() => {
          this.variantOfAnswerService.searchVariantsOfAnswerByQuestionId(this.questionId);
        });
      }
    });

    /* setTimeout(() => {
      this.answers = [
        new VariantOfAnswer('answer 1', 1),
        new VariantOfAnswer('answer 2', 2),
        new VariantOfAnswer('answer 3', 3),
        new VariantOfAnswer('answer 4', 4),
        new VariantOfAnswer('answer 5', 5),
      ];
      this.answers.forEach((el, ind) => {
        el.isCorrect = !!(ind % 2);
      });
      this.loadingState.stopLoading();
    }, 3000); */
  }

  private loadQuestion(): Promise<void> {
    return new Promise((res, rej) => {
      if (this.questionId !== 0) {
        this.loadingState.startLoading();
        this.questionService
          .getById(this.questionId)
          .pipe(
            tap({
              next: () => this.loadingState.stopLoading(),
              error: () => this.loadingState.stopLoading(),
            }),
          )
          .subscribe({
            next: (item) => {
              this.Question = item;
              res();
            },
            error: (err) => {
              this.WarningBox.Warn(err);
              rej();
            },
          } as Observer<Question>);
      } else {
        this.Question = null;
        rej();
      }
    });
  }

  ngOnInit(): void {
    this.loadingState.startLoading();
    this.variantOfAnswerService.searchVariantsOfAnswerByQuestionId(this.questionId);
  }

  ngOnDestroy(): void {
    this.answersSub?.unsubscribe();
  }

  private loadAnswer(id: number, observer: Observer<VariantOfAnswer>) {
    this.variantOfAnswerService.getById(id).subscribe(observer);
  }

  onAnswerChange() {
    const res = this.answerEditorFormService.validateAnswer();

    if (!res) {
      this.AnswerAlertBox.hideAlert();
    } else {
      this.AnswerAlertBox.Alert(res);
    }
  }

  public shakeDelBtn: boolean = false;

  deleteItem(variantOfAnswer: VariantOfAnswer) {
    if (this.answers.length === 1) {
      this.shakeDelBtn = !this.shakeDelBtn;
      this.WarningBox.Warn("Last answer cann't be deleted");
      return;
    }
    this.variantOfAnswerService.deleteVariantOfAnswer(variantOfAnswer.id as number).subscribe({
      next: () => {
        this.InfoBox.Info('Answer succesfully deleted!');
        this.variantOfAnswerService.searchVariantsOfAnswerByQuestionId(this.questionId);
      },
      error: (errMsg: string) => console.log(errMsg),
    } as Observer<void>);
    /* const index = this.answers.indexOf(variantOfAnswer);
    this.answers.splice(index, 1); */
  }

  submit() {
    if (this.questionId === 0 && !this.answerFormService.isNewQuestionSaved()) {
      this.WarningBox.Warn('You have to create question firstly!');
    } else if (this.questionId === 0 && this.answerFormService.isNewQuestionSaved()) {
      this.submitAnswerForNewQuestion();
    } else {
      this.submitAnswerForExistingQuestion();
    }
  }

  private submitAnswerForNewQuestion() {
    try {
      this.answerFormService.submitAnswerEditorForm({
        next: (itemId) => {
          this.loadAnswer(itemId, {
            next: (ans) => {
              this.questionId = ans.questionId as number;
              this.router.navigate([
                'menus/menu/questionmenu/question',
                this.questionId,
                'answerseditor',
              ]);
              this.InfoBox.Info('Answer succesfully created!');
            },
          } as Observer<VariantOfAnswer>);
        },
        error: (errMsg: string) => this.WarningBox.Warn(errMsg),
      } as Observer<number>);
    } catch (error) {
      console.error(error);
    }
  }

  private submitAnswerForExistingQuestion() {
    try {
      this.answerEditorFormService.submit(this.questionId, {
        next: (itemId) => {
          this.InfoBox.Info('Answer succesfully created!');
          this.variantOfAnswerService.searchVariantsOfAnswerByQuestionId(this.questionId);
          console.log(itemId);
        },
        error: (errMsg: string) => this.WarningBox.Warn(errMsg),
      } as Observer<number>);
    } catch (error) {
      console.error(error);
    }
  }

  private checkCollection() {
    if ((this.answers === null || this.answers.length === 0) && !this.loadingState.value) {
      this.ListAlertBox.Alert('No answer was found!');
    } else {
      this.ListAlertBox.hideAlert();
    }
  }
}
