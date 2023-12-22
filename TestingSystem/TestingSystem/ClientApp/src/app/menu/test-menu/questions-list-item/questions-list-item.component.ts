import { Component, Input, Output, EventEmitter } from '@angular/core';
import Question from '../../../core/models/question.model';

@Component({
  selector: 'questions-list-item-component',
  templateUrl: './questions-list-item.component.html',
  styleUrls: ['./questions-list-item.component.css'],
})
export default class QuestionsListItemComponent {
  public isSettingsVisible: boolean = false;

  @Input()
  item: Question = null;

  @Output() deleteButtonPushed = new EventEmitter<Question>();

  public delete() {
    this.deleteButtonPushed.emit(this.item);
  }

  public get Query(): String {
    if (this.item === null) {
      return 'Name is not set';
    }
    return this.item.query;
  }
}
