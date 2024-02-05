import { Component, Input, Output, EventEmitter } from '@angular/core';
import { bounceInOnEnterAnimation, zoomOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'warning-component',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss'],
  animations: [
    bounceInOnEnterAnimation({ duration: 400 }),
    zoomOutOnLeaveAnimation({ duration: 200 }),
  ],
})
export default class WarningComponent {
  @Input()
  message: string = null;

  @Input()
  public isVisible: boolean = false;

  @Output() closeButtonPushed = new EventEmitter<void>();

  hide() {
    this.isVisible = false;
    this.closeButtonPushed.emit();
  }
}
