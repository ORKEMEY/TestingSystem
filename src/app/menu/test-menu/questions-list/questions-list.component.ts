import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observer, Subscription } from 'rxjs';
import QuestionService from '../../../core/services/question.service';
import TestVariantQuestionAddingService from '../../shared/test-var-question-adding.service';
import Paginator from '../../../shared/paginator';
import TestVariant from '../../../core/models/test-variant.model';
import Question from '../../../core/models/question.model';
import WarningBoxHandler from '../../../shared/utils/warning-box-handler';
import AlertBoxHandler from '../../../shared/utils/alert-box-handler';
import LoadingState from '../../../shared/utils/loading-state';
// import Answer from '../../../core/models/variant-of-answer.model';
// import QuestionType from '../../../core/models/question-type.model';

@Component({
  selector: 'questions-list-component',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css'],
})
export default class QuestionsListComponent
  extends Paginator<Question>
  implements OnInit, OnDestroy
{
  private questionsSub: Subscription;

  AlertBox: AlertBoxHandler = new AlertBoxHandler();

  WarningBox: WarningBoxHandler = new WarningBoxHandler();

  public searchLine: string | null;

  private testVar: TestVariant = null;

  loadingState: LoadingState = new LoadingState(true);

  @Input()
  public set testVariant(testVar: TestVariant) {
    this.testVar = testVar;
    this.questionService.searchQuestionsByTestVarId(testVar?.id);
  }

  public get testVariant(): TestVariant {
    return this.testVar;
  }

  private get testVariantId(): number {
    return this.testVariant?.id || 0;
  }

  public questions: Question[] | null;

  protected get items(): Question[] | null {
    return this.questions;
  }

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private questionAddingService: TestVariantQuestionAddingService,
  ) {
    super(1000);

    /* const qTypes = [
      new QuestionType('Single Choise'),
      new QuestionType('True / False'),
      new QuestionType('Short Answer'),
    ];

    const answers = [
      new Answer('answer 1', 1),
      new Answer('answer 2', 2),
      new Answer('answer 3', 3),
      new Answer('answer 4', 4),
      new Answer('answer 5', 5),
    ];

    answers.forEach((el, ind) => {
      el.isCorrect = !!(ind % 2);
    });

    this.questions = [
      new Question('query1', answers.slice(0, 2)),
      new Question('query2', answers.slice(1, 3)),
      new Question('query3', answers.slice(2, 4)),
      new Question('query4', answers.slice(3)),
    ];

    this.questions.forEach((q, ind) => {
      q.questionType = qTypes[ind % 3];
      q.id = ind;
    }); */
  }

  ngOnInit(): void {
    this.questionsSub = this.questionService.value$.subscribe((data: Question[] | null) => {
      this.questions = data;
      this.loadingState.stopLoading();
      this.toFirstPage();
      this.checkCollection();
    });
    this.loadingState.startLoading();
    this.questionService.searchQuestionsByTestVarId(this.testVariantId);
  }

  ngOnDestroy(): void {
    this.questionsSub?.unsubscribe();
  }

  deleteItem(question: Question) {
    this.questionService
      .deleteQuestionFromTestVariant(this.testVariant.id, question.id as number)
      .subscribe({
        next: () => {
          this.questionService.searchQuestionsByTestVarId(this.testVariantId);
        },
        error: (errMsg: string) => console.log(errMsg),
      } as Observer<void>);
  }

  addQuestion() {
    if (this.testVariantId === 0) {
      this.WarningBox.Warn('Firstly create question!');
      return;
    }
    this.questionAddingService.clear();
    this.questionAddingService.pushTestVariant(this.testVariantId);
    this.router.navigate(['/menus/menu/questionmenu/question/0/settings']);
  }

  onSearchLineEmpty() {
    if (this.searchLine === '') {
      this.questions = this.questionService.value;
    }
  }

  searchItems() {
    if (this.searchLine !== '' && this.searchLine !== undefined) {
      this.questions = this.questionService.value?.filter((el) =>
        el.query.includes(this.searchLine.trim()),
      );
    } else {
      console.log('searching line is empty');
    }
  }

  private checkCollection() {
    if ((this.questions === null || this.questions.length === 0) && !this.loadingState) {
      this.AlertBox.Alert('No question was found!');
    } else {
      this.AlertBox.hideAlert();
    }
  }
}
