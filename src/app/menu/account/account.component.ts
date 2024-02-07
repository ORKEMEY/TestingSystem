import { Component } from '@angular/core';

@Component({
  selector: 'account-component',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export default class AccountComponent {
  public isBtnActive: Object = {
    AccountSettings: true,
    ChangeLogin: false,
    ChangePassword: false,
  };
  activateBtn(name: string) {
    Object.keys(this.isBtnActive).forEach((key) => {
      this.isBtnActive[key] = false;
    });
    this.isBtnActive[name] = true;
  }
}
