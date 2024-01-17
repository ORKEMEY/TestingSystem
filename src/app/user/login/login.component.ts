import { Component, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observer } from 'rxjs';
import UserLoginService from '../shared/user-login.service';
import AlertBoxHandler from '../../shared/utils/alert-box-handler';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent implements AfterViewInit {
  // #region msgBoxes
  LoginAlertBox: AlertBoxHandler = new AlertBoxHandler();

  PasswordAlertBox: AlertBoxHandler = new AlertBoxHandler();

  CommonAlertBox: AlertBoxHandler = new AlertBoxHandler();

  // #endregion

  public get form(): FormGroup {
    return this.loginService.form;
  }

  constructor(private loginService: UserLoginService) {}

  ngAfterViewInit() {
    this.form.valueChanges.subscribe(() => this.CommonAlertBox.hideAlert());
    this.loginChange();
    this.passwordChange();
  }

  loginChange() {
    if (this.form.controls.Login.valid) {
      this.LoginAlertBox.hideAlert();
    }

    const res = this.loginService.ValidateLogin();

    if (!res) {
      this.LoginAlertBox.hideAlert();
    } else {
      this.LoginAlertBox.Alert(res);
    }
  }

  passwordChange() {
    const res = this.loginService.ValidatePassword();

    if (!res) {
      this.PasswordAlertBox.hideAlert();
    } else {
      this.PasswordAlertBox.Alert(res);
    }
  }

  submit() {
    try {
      this.loginService.submit({
        error: (errMsg: string) => this.CommonAlertBox.Alert(errMsg),
      } as Observer<void>);
    } catch (error) {
      console.error(error);
    }
  }
}
