import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observer } from 'rxjs';
import TestService from '../../../core/services/test.service';
import TestCheckService from '../shared/test-check.service';
import Test from '../../../core/models/test.model';
import TestVariant from '../../../core/models/test-variant.model';
import Question from '../../../core/models/question.model';
import Log from '../../../core/models/log.model';
import Paginator from '../../../shared/paginator';

import Answer from '../../../core/models/variant-of-answer.model';
import QuestionType from '../../../core/models/question-type.model';

@Component({
  selector: 'test-component',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export default class TestComponent extends Paginator<Test> {
  #questions: Question[] | null;

  protected get items(): Test[] | null {
    return this.questions;
  }

  public set questions(value: Question[] | null) {
    this.#questions = value;
  }

  public get questions(): Question[] | null {
    return this.#questions;
  }

  private TestId: number = 0;

  private Test: Test = null;

  private TestVariant: TestVariant = null;

  private timer: NodeJS.Timer;

  private startTime: Date;

  public isTestRunning: Boolean = false;

  @ViewChild('timer', { static: false })
  timerDiv: ElementRef | undefined;

  constructor(
    private testService: TestService,
    private testCheckService: TestCheckService,
    private activatedRoute: ActivatedRoute,
  ) {
    super(15);
    this.activatedRoute.parent.params.subscribe((params) => {
      this.TestId = Number.parseInt(params.id, 10);
      this.loadTest();
    });

    /* this.Test = new Test('name', '10:10:10', '11:10:10', '12:10:10', null, 'description');

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

  startTest() {
    if (!this.Test) return;
    const duration = this.Test?.duration?.split(':') || null;
    if (duration === null) return;
    const durationSec =
      (Number.parseInt(duration?.[0], 10) || 0) * 60 * 60 + Number.parseInt(duration?.[1], 10) * 60;
    this.startTime = new Date();
    this.startTimer(durationSec);
    this.isTestRunning = true;
  }

  submit() {
    this.stopTimer();
    const expiredTimeSec = new Date().getSeconds() - this.startTime.getSeconds();
    const expiredTimeSpan = this.getDurationStr(expiredTimeSec);
    const log = new Log(expiredTimeSpan, new Date().toDateString());
    this.isTestRunning = false;
    this.testCheckService.submit(this.Test, this.TestVariant, log);
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
        this.timerDiv.nativeElement.textContent = `${Math.trunc(hour)}:${Math.trunc(
          minutes,
        )}:${seconds}`;
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
      this.testService.getOwnedById(this.TestId, {
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
}
