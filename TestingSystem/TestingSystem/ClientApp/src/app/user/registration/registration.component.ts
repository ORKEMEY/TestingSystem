import { Component, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';
import UserRegistrationService from '../shared/user-registration.service';
import AlertBoxHandler from '../../shared/utils/alert-box-handler';

@Component({
  selector: 'registration-component',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export default class RegistrationComponent implements AfterViewInit {
  // #region msgBoxes
  LoginAlertBox: AlertBoxHandler = new AlertBoxHandler();

  NameAlertBox: AlertBoxHandler = new AlertBoxHandler();

  SurnameAlertBox: AlertBoxHandler = new AlertBoxHandler();

  EMailAlertBox: AlertBoxHandler = new AlertBoxHandler();

  PasswordAlertBox: AlertBoxHandler = new AlertBoxHandler();

  ConfirmPasswordAlertBox: AlertBoxHandler = new AlertBoxHandler();

  CommonAlertBox: AlertBoxHandler = new AlertBoxHandler();

  // #endregion

  public get form(): FormGroup {
    return this.regServise.form;
  }

  constructor(private regServise: UserRegistrationService) {}

  ngAfterViewInit() {
    this.form.valueChanges.subscribe(() => this.CommonAlertBox.hideAlert());
    this.loginChange();
    this.passwordChange();
  }

  // #region validation

  loginChange() {
    const res = this.regServise.ValidateLogin();

    if (!res) {
      this.LoginAlertBox.hideAlert();
    } else {
      this.LoginAlertBox.Alert(res);
    }
  }

  nameChange() {
    const res = this.regServise.ValidateName();

    if (!res) {
      this.NameAlertBox.hideAlert();
    } else {
      this.NameAlertBox.Alert(res);
    }
  }

  surnameChange() {
    const res = this.regServise.ValidateSurname();

    if (!res) {
      this.SurnameAlertBox.hideAlert();
    } else {
      this.SurnameAlertBox.Alert(res);
    }
  }

  emailChange() {
    const res = this.regServise.ValidateEMail();

    if (!res) {
      this.EMailAlertBox.hideAlert();
    } else {
      this.EMailAlertBox.Alert(res);
    }
  }

  passwordChange() {
    const res = this.regServise.ValidatePassword();

    if (!res) {
      this.PasswordAlertBox.hideAlert();
    } else {
      this.PasswordAlertBox.Alert(res);
    }

    this.confirmPasswordChange();
  }

  confirmPasswordChange() {
    const res = this.regServise.ValidatePasswordConfirmation();

    if (!res) {
      this.ConfirmPasswordAlertBox.hideAlert();
    } else {
      this.ConfirmPasswordAlertBox.Alert(res);
    }
  }

  // #endregion

  submit() {
    try {
      this.regServise.submit({
        error: (errMsg: string) => this.CommonAlertBox.Alert(errMsg),
      } as Observer<void>);
    } catch (error) {
      console.error(error);
    }
  }
}
