import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import AlertBoxHandler from '../../../shared/utils/alert-box-handler';

@Component({
  selector: 'password-confirmation',
  templateUrl: 'password-confirmation.component.html',
  styleUrls: ['password-confirmation.component.scss'],
  animations: [
    fadeInOnEnterAnimation({ duration: 600 }),
    fadeOutOnLeaveAnimation({ duration: 200 }),
  ],
})
export default class PasswordConfirmationComponent {
  PasswordAlertBox: AlertBoxHandler = new AlertBoxHandler();

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

    if (!res) {
      this.PasswordAlertBox.hideAlert();
    } else {
      this.PasswordAlertBox.Alert(res);
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
    this.form.reset();
    this.closed.emit();
  }

  submit() {
    this.confirmed.emit(this.form.controls.Password.value);
    this.form.reset();
  }
}
