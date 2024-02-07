import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';
import LoginFormService from '../shared/login-form.service';
import CredentialsService from '../../../core/services/credentials.service';
import WarningBoxHandler from '../../../shared/utils/warning-box-handler';
import InfoBoxHandler from '../../../shared/utils/info-box-handler';
import AlertBoxHandler from '../../../shared/utils/alert-box-handler';

@Component({
  selector: 'login-alteration',
  templateUrl: './login-alteration.component.html',
  styleUrls: ['./login-alteration.component.scss'],
})
export default class LoginAlterationComponent implements OnDestroy {
  LoginAlertBox: AlertBoxHandler = new AlertBoxHandler();

  WarningBox: WarningBoxHandler = new WarningBoxHandler();

  InfoBox: InfoBoxHandler = new InfoBoxHandler();

  public get form(): FormGroup {
    return this.loginFormService.form;
  }

  formDisabled: boolean = true;

  isPassConfirmVisible: boolean = false;

  constructor(
    private loginFormService: LoginFormService,
    private credentialsService: CredentialsService,
  ) {
    this.loadLogin();
  }

  private loadLogin() {
    const login = this.credentialsService.getLogin();
    if (login) this.loginFormService.Login = login;
    else this.WarningBox.Warn("Ooops, something went wrong! Couldn't load data");
  }

  ngOnDestroy(): void {
    this.form.reset();
  }

  onLoginChange() {
    const res = this.loginFormService.ValidateLogin();

    if (!res) {
      this.LoginAlertBox.hideAlert();
    } else {
      this.LoginAlertBox.Alert(res);
    }
  }

  change() {
    if (this.loginFormService.Login) {
      this.formDisabled = false;
    } else this.WarningBox.Warn("Couldn't load data");
  }

  cancel() {
    this.formDisabled = true;
    this.loginFormService.reset();
  }

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

  sendForm(password: string) {
    try {
      this.loginFormService.submit(password, {
        next: () => {
          this.loadLogin();
          this.InfoBox.Info('Login successfully changed!');
        },
        error: (errMsg: string) => {
          this.loginFormService.reset();
          if (typeof errMsg !== 'string')
            this.WarningBox.Warn("Ooops, something went wrong! Couldn't save changes");
          else this.WarningBox.Warn(errMsg);
        },
      } as Observer<void>);
    } catch (error) {
      console.error(error);
    }
  }
}
