import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observer, Subscription } from 'rxjs';
import QuestionService from '../../../core/services/question.service';
import TestVariantQuestionAddingService from '../../shared/test-var-question-adding.service';
import Paginator from '../../../shared/paginator';
import TestVariant from '../../../core/models/test-variant.model';
import Question from '../../../core/models/question.model';
// import Answer from '../../../core/models/variant-of-answer.model';
// import QuestionType from '../../../core/models/question-type.model';
import Alert from '../../../core/alert';

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

  @ViewChild('alertDiv', { static: false })
  alertDiv: ElementRef | undefined;

  isWarningVisible: Boolean = false;

  warningMessage: string = '';

  public searchLine: string | null;

  private testVar: TestVariant = null;

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
    /*
    const qTypes = [
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
    this.questionsSub = this.questionService.dataQuestions$.subscribe((data: Question[] | null) => {
      this.questions = data;
      this.toFirstPage();
      this.checkCollection();
    });
    this.questionService.searchQuestionsByTestVarId(this.testVariantId);
  }

  ngOnDestroy(): void {
    this.questionsSub.unsubscribe();
  }

  deleteItem(question: Question) {
    this.questionService.DeleteQuestionFromTestVariant(
      this.testVariant.id,
      question.id as number,
      {
        next: () => {
          this.questionService.searchQuestionsByTestVarId(this.testVariantId);
        },
        error: (errMsg: string) => console.log(errMsg),
      } as Observer<void>,
    );
    /* const index = this.questions.indexOf(question);
    this.questions.splice(index, 1); */
  }

  addQuestion() {
    if (this.testVariantId === 0) {
      this.Warn('Firstly create question!');
      return;
    }
    this.questionAddingService.clear();
    this.questionAddingService.pushTestVariant(this.testVariantId);
    this.router.navigate(['/menus/menu/questionmenu/question/0/settings']);
  }

  onSearchLineEmpty() {
    if (this.searchLine === '') {
      this.questionService.searchQuestionsByTestVarId(this.testVariantId);
    }
  }

  searchItems() {
    if (this.searchLine !== '' && this.searchLine !== undefined) {
      this.questions = this.questions.filter((el) => el.query.includes(this.searchLine.trim()));
    } else {
      console.log('searching line is empty');
    }
  }

  private checkCollection() {
    if (this.questions === null || this.questions.length === 0) {
      Alert.alertMessage(this.alertDiv, 'No question was found!');
    } else {
      Alert.hideAlertMessage(this.alertDiv);
    }
  }

  Warn(msg: string) {
    this.warningMessage = msg;
    this.isWarningVisible = true;
  }

  hideWarning() {
    this.warningMessage = '';
    this.isWarningVisible = false;
  }
}
