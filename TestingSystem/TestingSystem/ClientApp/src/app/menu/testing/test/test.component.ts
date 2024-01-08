import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer, timer, takeWhile } from 'rxjs';
import TestService from '../../../core/services/test.service';
import TestCheckService from '../shared/test-check.service';
import Test from '../../../core/models/test.model';
import TestVariant from '../../../core/models/test-variant.model';
import Question from '../../../core/models/question.model';
import Log from '../../../core/models/log.model';
import Paginator from '../../../shared/paginator';

// import Answer from '../../../core/models/variant-of-answer.model';
// import QuestionType from '../../../core/models/question-type.model';

@Component({
  selector: 'test-component',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export default class TestComponent extends Paginator<Test> {
  public get Status(): string {
    if (this.Test === null) return 'Not found!';
    const nullDate = new Date(null).getTime();
    const opening = new Date(this.Test.openingTime).getTime();
    const closure = new Date(this.Test.closureTime).getTime();
    const now = new Date().getTime();

    if (now < opening) {
      return 'Pending';
    }

    if (
      (opening < now && (now < closure || closure === nullDate)) ||
      (opening === nullDate && now < closure) ||
      (opening === nullDate && closure === nullDate)
    ) {
      return 'Opened';
    }

    if (closure < now && closure !== nullDate) {
      return 'Closed';
    }
    return 'No status';
  }

  public get isOpened(): boolean {
    return this.Status === 'Opened';
  }

  public get LabelClasses(): Object {
    const labelClasses = {};

    switch (this.Status) {
      case 'Pending':
        labelClasses['badge-warning'] = true;
        break;

      case 'Opened':
        labelClasses['badge-success'] = true;
        break;

      case 'Closed':
        labelClasses['badge-danger'] = true;
        break;

      default:
        labelClasses['badge-danger'] = true;
        break;
    }
    return labelClasses;
  }

  protected get items(): Test[] | null {
    return this.questions;
  }

  public get questions(): Question[] | null {
    return this.TestVariant?.questions;
  }

  private TestId: number = 0;

  private Test: Test = null;

  private TestVariant: TestVariant = null;

  private timer: NodeJS.Timer;

  private startTime: Date;

  public isTestRunning: Boolean = false;

  public TimerStr: string = '--:--:--';

  constructor(
    private testService: TestService,
    private testCheckService: TestCheckService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    super(5);
    this.activatedRoute.params.subscribe((params) => {
      this.TestId = Number.parseInt(params.id, 10);
      this.loadTest();
    });

    /* this.Test = new Test(
      'test name',
      '10:10:10',
      '2023-06-01T13:45:30',
      '2024-07-01T13:45:30',
      null,
      'description',
    );

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
      el.id = ind;
    });

    this.TestVariant = new TestVariant(1, 1);

    this.TestVariant.questions = [
      new Question('query1', answers.slice(0, 2)),
      new Question('query2', answers.slice(1, 3)),
      new Question('query3', answers.slice(2, 4)),
      new Question('query4', answers.slice(3)),
      new Question('query1', answers.slice(0, 2)),
      new Question('query2', answers.slice(1, 3)),
      new Question('query3', answers.slice(2, 4)),
      new Question('query1', answers.slice(0, 2)),
      new Question('query2', answers.slice(1, 3)),
      new Question('query3', answers.slice(2, 4)),
    ];

    this.TestVariant.questions.forEach((q, ind) => {
      q.questionType = qTypes[ind % 3];
      q.id = ind;
    });

    this.Test.testVariants = [this.TestVariant]; */
  }

  startTest() {
    if (!this.Test) return;

    this.setTestVariant();
    const duration = this.Test?.duration?.split(':') || null;
    if (duration !== null) {
      const durationSec =
        (Number.parseInt(duration?.[0], 10) || 0) * 60 * 60 +
        Number.parseInt(duration?.[1], 10) * 60;

      this.startTimer(durationSec);
    }
    this.startTime = new Date();
    this.isTestRunning = true;
  }

  submit() {
    this.stopTimer();
    const expiredTimeSec = (new Date().getTime() - this.startTime.getTime()) / 1000;
    const expiredTimeSpan = this.getDurationStr(expiredTimeSec);
    const log = new Log(expiredTimeSpan, new Date().toDateString());
    this.isTestRunning = false;
    this.testCheckService.submit(this.Test, this.TestVariant, log, {
      next: (createdLog) => {
        console.log(createdLog);
        this.router.navigate(['/menus/menu/testing/test/result', createdLog.id]);
      },
    } as Observer<Log>);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  startTimer(totalSeconds: number) {
    let timeSec = totalSeconds - 1;
    this.timer = setInterval(() => {
      const seconds = timeSec % 60;
      const minutes = (timeSec / 60) % 60;
      const hour = (timeSec / 60 / 60) % 60;
      if (timeSec <= 0) {
        this.submit();
      }
      if (!Number.isNaN(timeSec)) {
        this.TimerStr = `${Math.trunc(hour)}:${Math.trunc(minutes)}:${seconds}`;
      }

      timeSec -= 1;
    }, 1000);
  }

  setTestVariant() {
    if (this.Test === null) return;
    const num = this.Test.testVariants.length;
    const ind = Math.floor(Math.random() * num);
    this.TestVariant = this.Test.testVariants[ind];
  }

  private loadTest() {
    if (this.TestId !== 0) {
      this.testService.getById(this.TestId, {
        next: (item) => {
          this.Test = item;
          this.setTestVariant();
        },
      } as Observer<Test>);
    } else {
      this.Test = null;
    }
  }

  private getDurationStr(totalSec: number): string {
    const hours = Math.trunc(totalSec / 3600);
    const minutes = Math.trunc((totalSec % 3600) / 60);
    const seconds = Math.trunc(totalSec % 60);
    let strHours;
    let strMin;
    let strSec;
    if (hours !== 0) {
      strHours = hours < 10 ? `0${hours}` : `${hours}`;
    } else {
      strHours = '00';
    }
    if (minutes !== 0) {
      strMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    } else {
      strMin = '00';
    }
    if (seconds !== 0) {
      strSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    } else {
      strMin = '00';
    }
    return `${strHours}:${strMin}:${strSec}`;
  }

  public toPrevPage() {
    if (this.previous()) {
      this.scrollToTop(2);
    }
  }

  public toNextPage() {
    if (this.next()) {
      this.scrollToTop(2);
    }
  }

  scrollToTop(acceleration: number = 1) {
    let scrollAvailable = true;

    timer(0, 1)
      .pipe(takeWhile(() => scrollAvailable))
      .subscribe((e) => {
        if (window.pageYOffset >= 0) {
          window.scrollTo(0, window.pageYOffset - e * acceleration);
        }

        if (window.pageYOffset === 0) {
          scrollAvailable = false;
        }
      });
  }
}
