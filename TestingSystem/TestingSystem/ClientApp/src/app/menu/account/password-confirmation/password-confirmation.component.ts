import { Component, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import Alert from '../../../core/utils/alert';

@Component({
  selector: 'password-confirmation',
  templateUrl: 'password-confirmation.component.html',
  styleUrls: ['password-confirmation.component.css'],
  animations: [
    fadeInOnEnterAnimation({ duration: 600 }),
    fadeOutOnLeaveAnimation({ duration: 200 }),
  ],
})
export default class PasswordConfirmationComponent {
  @ViewChild('alertPasswordDiv', { static: false })
  alertPasswordDiv: ElementRef | undefined;

  @Input()
  public isVisible: boolean = false;

  @Output()
  public confirmed = new EventEmitter<string>();

  @Output()
  public closed = new EventEmitter<void>();

  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      Password: new FormControl('', Validators.required),
    });
  }

  onPasswordChange() {
    const res = this.validatePassword();

    if (res === null) {
      Alert.hideAlertMessage(this.alertPasswordDiv);
    } else {
      Alert.alertMessage(this.alertPasswordDiv, res);
    }
  }

  private validatePassword(): string | null {
    if (this.form.controls.Password.valid || this.form.controls.Password.pristine) {
      return null;
    }
    let res: string | null = null;
    if (this.form.controls.Password.errors?.required) {
      res = "Password can't be empty!";
    }
    return res;
  }

  close() {
    this.isVisible = false;
    this.closed.emit();
  }

  submit() {
    this.confirmed.emit(this.form.controls.Password.value);
  }
}
