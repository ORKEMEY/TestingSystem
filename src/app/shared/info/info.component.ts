import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'info-component',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export default class InfoComponent {
  @Input()
  message: string = null;

  @Output() closeButtonPushed = new EventEmitter<void>();

  hide() {
    this.closeButtonPushed.emit();
  }
}
