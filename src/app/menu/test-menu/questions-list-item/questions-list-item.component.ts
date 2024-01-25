import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { flipInXOnEnterAnimation, flipOutXOnLeaveAnimation } from 'angular-animations';
import Question from '../../../core/models/question.model';

@Component({
  selector: 'questions-list-item-component',
  templateUrl: './questions-list-item.component.html',
  styleUrls: ['./questions-list-item.component.css'],
  animations: [
    flipInXOnEnterAnimation({ duration: 500 }),
    flipOutXOnLeaveAnimation({ duration: 300 }),
  ],
})
export default class QuestionsListItemComponent {
  public isSettingsVisible: boolean = false;

  @Input()
  item: Question = null;

  @Input()
  public Index: number = 0;

  public get Number(): number {
    return this.Index + 1;
  }

  @Output() deleteButtonPushed = new EventEmitter<Question>();

  constructor(private router: Router) {}

  public delete() {
    this.deleteButtonPushed.emit(this.item);
  }

  public get Query(): String {
    if (this.item === null) {
      return 'Query is not set';
    }
    return this.item.query;
  }

  memorizePath() {
    localStorage.setItem('prev', this.router.url);
  }
}
