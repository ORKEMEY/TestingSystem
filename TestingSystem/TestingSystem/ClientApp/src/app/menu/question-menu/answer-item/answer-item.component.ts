import { Component, Input, Output, EventEmitter } from '@angular/core';
import Answer from '../../../core/models/variant-of-answer.model';

@Component({
  selector: 'answer-item-component',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.css'],
})
export default class AnswerItemComponent {
  @Input()
  item: Answer = null;

  @Output() deleteButtonPushed = new EventEmitter<Answer>();

  public delete() {
    this.deleteButtonPushed.emit(this.item);
  }
}
