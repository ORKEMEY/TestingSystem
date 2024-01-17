import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';
import AccountFormService from './shared/account-form.service';
import UserService from '../../core/services/user.service';
import Customer from '../../core/models/customer.model';
import WarningBoxHandler from '../../shared/utils/warning-box-handler';
import InfoBoxHandler from '../../shared/utils/info-box-handler';
import Alert from '../../core/utils/alert';

@Component({
  selector: 'account-component',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export default class AccountComponent {
  @ViewChild('alertLoginDiv', { static: false })
  alertLoginDiv: ElementRef | undefined;

  @ViewChild('alertNameDiv', { static: false })
  alertNameDiv: ElementRef | undefined;

  @ViewChild('alertSurnameDiv', { static: false })
  alertSurnameDiv: ElementRef | undefined;

  @ViewChild('alertEMailDiv', { static: false })
  alertEMailDiv: ElementRef | undefined;

  WarningBox: WarningBoxHandler = new WarningBoxHandler();

  InfoBox: InfoBoxHandler = new InfoBoxHandler();

  formDisabled: Boolean = true;

  isPassConfirmVisible: Boolean = false;

  public get form(): FormGroup {
    return this.accountFormService.form;
  }

  private customer: Customer = null;

  public get Customer(): Customer {
    return this.customer;
  }

  public set Customer(item: Customer) {
    this.customer = item;
    this.accountFormService.Customer = this.customer;
    this.validateForm();
  }

  constructor(private accountFormService: AccountFormService, private userService: UserService) {
    this.loadCustomer();
  }

  private loadCustomer() {
    this.userService.getCurrentCustomer({
      next: (item) => {
        this.Customer = item;
      },
      error: (err) => {
        if (typeof err !== 'string')
          this.WarningBox.Warn("Ooops, something went wrong! Couldn't load data");
        else this.WarningBox.Warn(err);
      },
      complete: () => console.log('comlete'),
    } as Observer<Customer>);
  }

  // #region validation
  onLoginChange() {
    const res = this.accountFormService.ValidateLogin();

    if (res === null) {
      Alert.hideAlertMessage(this.alertLoginDiv);
    } else {
      Alert.alertMessage(this.alertLoginDiv, res);
    }
  }

  onNameChange() {
    const res = this.accountFormService.ValidateName();

    if (res === null) {
      Alert.hideAlertMessage(this.alertNameDiv);
    } else {
      Alert.alertMessage(this.alertNameDiv, res);
    }
  }

  onSurnameChange() {
    const res = this.accountFormService.ValidateSurname();

    if (res === null) {
      Alert.hideAlertMessage(this.alertSurnameDiv);
    } else {
      Alert.alertMessage(this.alertSurnameDiv, res);
    }
  }

  onEMailChange() {
    const res = this.accountFormService.ValidateEMail();

    if (res === null) {
      Alert.hideAlertMessage(this.alertEMailDiv);
    } else {
      Alert.alertMessage(this.alertEMailDiv, res);
    }
  }

  validateForm() {
    this.onLoginChange();
    this.onNameChange();
    this.onSurnameChange();
    this.onEMailChange();
  }

  // #endregion

  change() {
    if (this.Customer) {
      this.formDisabled = false;
    } else this.WarningBox.Warn("Couldn't load data");
  }

  cancel() {
    this.formDisabled = true;
    this.form.reset();
  }

  // #region submition
  confirmPassword() {
    this.isPassConfirmVisible = true;
  }

  onPasswordNotConfirmed() {
    this.isPassConfirmVisible = false;
    this.formDisabled = false;
  }

  onPasswordConfirmed(pas: string) {
    this.isPassConfirmVisible = false;
    this.formDisabled = true;
    this.sendForm(pas);
  }

  submit() {
    this.confirmPassword();
  }

  private sendForm(password: string) {
    this.accountFormService.submit(password, {
      next: () => {
        this.InfoBox.Info('Changes saved!');
        this.loadCustomer();
      },
      error: (errMsg: string) => {
        this.loadCustomer();
        if (typeof errMsg !== 'string')
          this.WarningBox.Warn("Ooops, something went wrong! Couldn't save changes");
        else this.WarningBox.Warn(errMsg);
      },
    } as Observer<void>);
  }

  // #endregion
}
