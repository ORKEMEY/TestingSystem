import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';
import UserLoginService from '../shared/user-login.service';
import Alert from '../../core/utils/alert';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent implements AfterViewInit {
  @ViewChild('alertLoginDiv', { static: false })
  alertLoginDiv: ElementRef | undefined;

  @ViewChild('alertPasswordDiv', { static: false })
  alertPasswordDiv: ElementRef | undefined;

  @ViewChild('alertCommonDiv', { static: false })
  alertCommonDiv: ElementRef | undefined;

  public get form(): FormGroup {
    return this.loginService.form;
  }

  constructor(private loginService: UserLoginService) {}

  ngAfterViewInit() {
    this.form.valueChanges.subscribe(() => Alert.hideAlertMessage(this.alertCommonDiv));
    this.loginChange();
    this.passwordChange();
  }

  loginChange() {
    if (this.form.controls.Login.valid) {
      Alert.hideAlertMessage(this.alertLoginDiv);
    }

    const res = this.loginService.ValidateLogin();

    if (res === null) {
      Alert.hideAlertMessage(this.alertLoginDiv);
    } else {
      Alert.alertMessage(this.alertLoginDiv, res);
    }
  }

  passwordChange() {
    const res = this.loginService.ValidatePassword();

    if (res === null) {
      Alert.hideAlertMessage(this.alertPasswordDiv);
    } else {
      Alert.alertMessage(this.alertPasswordDiv, res);
    }
  }

  submit() {
    try {
      this.loginService.submit({
        error: (errMsg: string) => Alert.alertMessage(this.alertCommonDiv, errMsg),
      } as Observer<void>);
    } catch (error) {
      console.error(error);
    }
  }
}
