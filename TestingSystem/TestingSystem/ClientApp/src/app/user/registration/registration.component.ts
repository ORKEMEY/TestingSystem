import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';
import UserRegistrationService from '../shared/user-registration.service';
import Alert from '../../core/alert';

@Component({
  selector: 'registration-component',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export default class RegistrationComponent implements AfterViewInit {
  @ViewChild('alertLoginDiv', { static: false })
  alertLoginDiv: ElementRef | undefined;

  @ViewChild('alertNameDiv', { static: false })
  alertNameDiv: ElementRef | undefined;

  @ViewChild('alertSurnameDiv', { static: false })
  alertSurnameDiv: ElementRef | undefined;

  @ViewChild('alertEMailDiv', { static: false })
  alertEMailDiv: ElementRef | undefined;

  @ViewChild('alertPasswordDiv', { static: false })
  alertPasswordDiv: ElementRef | undefined;

  @ViewChild('alertConfirmPasswordDiv', { static: false })
  alertConfirmPasswordDiv: ElementRef | undefined;

  @ViewChild('alertCommonDiv', { static: false })
  alertCommonDiv: ElementRef | undefined;

  public get form(): FormGroup {
    return this.regServise.form;
  }

  constructor(private regServise: UserRegistrationService) {}

  ngAfterViewInit() {
    this.form.valueChanges.subscribe(() => Alert.hideAlertMessage(this.alertCommonDiv));
    this.loginChange();
    this.passwordChange();
  }

  loginChange() {
    const res = this.regServise.ValidateLogin();

    if (res === null) {
      Alert.hideAlertMessage(this.alertLoginDiv);
    } else {
      Alert.alertMessage(this.alertLoginDiv, res);
    }
  }

  nameChange() {
    const res = this.regServise.ValidateName();

    if (res === null) {
      Alert.hideAlertMessage(this.alertNameDiv);
    } else {
      Alert.alertMessage(this.alertNameDiv, res);
    }
  }

  surnameChange() {
    const res = this.regServise.ValidateSurname();

    if (res === null) {
      Alert.hideAlertMessage(this.alertSurnameDiv);
    } else {
      Alert.alertMessage(this.alertSurnameDiv, res);
    }
  }

  emailChange() {
    const res = this.regServise.ValidateEMail();

    if (res === null) {
      Alert.hideAlertMessage(this.alertEMailDiv);
    } else {
      Alert.alertMessage(this.alertEMailDiv, res);
    }
  }

  passwordChange() {
    const res = this.regServise.ValidatePassword();

    if (res === null) {
      Alert.hideAlertMessage(this.alertPasswordDiv);
    } else {
      Alert.alertMessage(this.alertPasswordDiv, res);
    }

    this.confirmPasswordChange();
  }

  confirmPasswordChange() {
    const res = this.regServise.ValidatePasswordConfirmation();

    if (res === null) {
      Alert.hideAlertMessage(this.alertConfirmPasswordDiv);
    } else {
      Alert.alertMessage(this.alertConfirmPasswordDiv, res);
    }
  }

  submit() {
    try {
      this.regServise.submit({
        error: (errMsg: string) => Alert.alertMessage(this.alertCommonDiv, errMsg),
      } as Observer<void>);
    } catch (error) {
      console.error(error);
    }
  }
}
