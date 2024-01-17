import { Component, Input, Output, EventEmitter } from '@angular/core';
import { bounceInOnEnterAnimation, zoomOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'info-component',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  animations: [
    bounceInOnEnterAnimation({ duration: 600 }),
    zoomOutOnLeaveAnimation({ duration: 200 }),
  ],
})
export default class InfoComponent {
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
