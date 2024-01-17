import { ElementRef } from '@angular/core';

export default class Alert {
  static alertMessage(div: ElementRef | undefined, message: string) {
    if (div) {
      div.nativeElement.textContent = message;
      div.nativeElement.hidden = false;
    }
  }

  static hideAlertMessage(div: ElementRef | undefined) {
    if (div) {
      div.nativeElement.textContent = '';
      div.nativeElement.hidden = true;
    }
  }
}
