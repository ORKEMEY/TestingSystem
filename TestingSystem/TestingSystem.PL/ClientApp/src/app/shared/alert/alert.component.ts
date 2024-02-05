import { Component, Input } from '@angular/core';
import { expandOnEnterAnimation, collapseOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'alert-component',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    expandOnEnterAnimation({ duration: 200 }),
    collapseOnLeaveAnimation({ duration: 200 }),
  ],
})
export default class AlertComponent {
  @Input()
  message: string = null;

  @Input()
  public isVisible: boolean = false;
}
