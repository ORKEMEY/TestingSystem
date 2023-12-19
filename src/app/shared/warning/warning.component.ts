import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'warning-component',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css'],
})
export default class WarningComponent {
  @Input()
  message: string = null;

  @Output() closeButtonPushed = new EventEmitter<void>();

  hide() {
    this.closeButtonPushed.emit();
  }
}
