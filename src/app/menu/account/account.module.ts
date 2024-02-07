import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import AccountRoutingModule from './account-routing.module';
import SharedModule from '../../shared/shared.module';

import AccountFormService from './shared/account-form.service';
import PasswordFormService from './shared/password-form.service';
import LoginFormService from './shared/login-form.service';

import AccountComponent from './account.component';
import PasswordConfirmationComponent from './password-confirmation/password-confirmation.component';
import AccountAlterationComponent from './account-alteration/account-alteration.component';
import PasswordAlterationComponent from './password-alteration/password-alteration.component';
import LoginAlterationComponent from './login-alteration/login-alteration.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    SharedModule,
  ],
  declarations: [
    AccountComponent,
    PasswordConfirmationComponent,
    AccountAlterationComponent,
    PasswordAlterationComponent,
    LoginAlterationComponent,
  ],
  bootstrap: [],
  providers: [AccountFormService, PasswordFormService, LoginFormService],
  exports: [
    AccountComponent,
    PasswordConfirmationComponent,
    AccountAlterationComponent,
    PasswordAlterationComponent,
    LoginAlterationComponent,
  ],
})
export default class AccountModule {}
