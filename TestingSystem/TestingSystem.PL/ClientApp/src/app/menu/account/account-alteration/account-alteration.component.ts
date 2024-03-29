import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';
import AccountFormService from '../shared/account-form.service';
import UserService from '../../../core/services/user.service';
import Customer from '../../../core/models/customer.model';
import WarningBoxHandler from '../../../shared/utils/warning-box-handler';
import InfoBoxHandler from '../../../shared/utils/info-box-handler';
import AlertBoxHandler from '../../../shared/utils/alert-box-handler';

@Component({
  selector: 'account-alteration-component',
  templateUrl: './account-alteration.component.html',
  styleUrls: ['./account-alteration.component.scss'],
})
export default class AccountAlterationComponent {
  // #region msgBoxes

  NameAlertBox: AlertBoxHandler = new AlertBoxHandler();

  SurnameAlertBox: AlertBoxHandler = new AlertBoxHandler();

  EMailAlertBox: AlertBoxHandler = new AlertBoxHandler();

  WarningBox: WarningBoxHandler = new WarningBoxHandler();

  InfoBox: InfoBoxHandler = new InfoBoxHandler();
  // #endregion

  formDisabled: boolean = true;

  isPassConfirmVisible: boolean = false;

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

    /* const cust = new Customer();
    cust.login = 'login1';
    cust.surname = 'surname1';
    cust.name = 'name1';
    cust.eMail = 'eMail1';
    this.Customer = cust; */
  }

  private loadCustomer() {
    this.userService.getCurrentCustomer().subscribe({
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

  onNameChange() {
    const res = this.accountFormService.ValidateName();

    if (!res) {
      this.NameAlertBox.hideAlert();
    } else {
      this.NameAlertBox.Alert(res);
    }
  }

  onSurnameChange() {
    const res = this.accountFormService.ValidateSurname();

    if (!res) {
      this.SurnameAlertBox.hideAlert();
    } else {
      this.SurnameAlertBox.Alert(res);
    }
  }

  onEMailChange() {
    const res = this.accountFormService.ValidateEMail();

    if (!res) {
      this.EMailAlertBox.hideAlert();
    } else {
      this.EMailAlertBox.Alert(res);
    }
  }

  validateForm() {
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
    this.accountFormService.reset();
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
        this.accountFormService.reset();
        if (typeof errMsg !== 'string')
          this.WarningBox.Warn("Ooops, something went wrong! Couldn't save changes");
        else this.WarningBox.Warn(errMsg);
      },
    } as Observer<void>);
  }

  // #endregion
}
