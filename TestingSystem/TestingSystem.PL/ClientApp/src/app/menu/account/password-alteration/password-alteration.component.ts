import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';
import PasswordFormService from '../shared/password-form.service';
import WarningBoxHandler from '../../../shared/utils/warning-box-handler';
import InfoBoxHandler from '../../../shared/utils/info-box-handler';
import AlertBoxHandler from '../../../shared/utils/alert-box-handler';

@Component({
  selector: 'password-alteration',
  templateUrl: './password-alteration.component.html',
  styleUrls: ['./password-alteration.component.scss'],
})
export default class PasswordAlterationComponent implements OnDestroy {
  PasswordAlertBox: AlertBoxHandler = new AlertBoxHandler();

  ConfirmPasswordAlertBox: AlertBoxHandler = new AlertBoxHandler();

  WarningBox: WarningBoxHandler = new WarningBoxHandler();

  InfoBox: InfoBoxHandler = new InfoBoxHandler();

  public get form(): FormGroup {
    return this.passwordFormService.form;
  }

  constructor(private passwordFormService: PasswordFormService) {}

  ngOnDestroy(): void {
    this.form.reset();
  }

  // #region validation

  passwordChange() {
    const res = this.passwordFormService.ValidatePassword();

    if (!res) {
      this.PasswordAlertBox.hideAlert();
    } else {
      this.PasswordAlertBox.Alert(res);
    }

    this.confirmPasswordChange();
  }

  confirmPasswordChange() {
    const res = this.passwordFormService.ValidatePasswordConfirmation();

    if (!res) {
      this.ConfirmPasswordAlertBox.hideAlert();
    } else {
      this.ConfirmPasswordAlertBox.Alert(res);
    }
  }

  // #endregion

  submit() {
    try {
      this.passwordFormService.submit({
        next: () => {
          this.InfoBox.Info('Password successfully changed!');
          this.passwordFormService.reset();
        },
        error: (errMsg: string) => {
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
