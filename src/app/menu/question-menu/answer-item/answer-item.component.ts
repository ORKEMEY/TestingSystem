import { Component, Input, Output, EventEmitter } from '@angular/core';
import { headShakeAnimation } from 'angular-animations';
import Answer from '../../../core/models/variant-of-answer.model';

@Component({
  selector: 'answer-item-component',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.css'],
  animations: [headShakeAnimation()],
})
export default class AnswerItemComponent {
  @Input()
  item: Answer = null;

  @Input()
  shakeBtn: Boolean = false;

  @Output() deleteButtonPushed = new EventEmitter<Answer>();

  public delete() {
    this.deleteButtonPushed.emit(this.item);
  }
}
