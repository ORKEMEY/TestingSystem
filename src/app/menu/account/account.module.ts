import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import AccountRoutingModule from './account-routing.module';
import SharedModule from '../../shared/shared.module';

import AccountFormService from './shared/account-form.service';

import AccountComponent from './account.component';
import PasswordConfirmationComponent from './password-confirmation/password-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    SharedModule,
  ],
  declarations: [AccountComponent, PasswordConfirmationComponent],
  bootstrap: [],
  providers: [AccountFormService],
  exports: [AccountComponent, PasswordConfirmationComponent],
})
export default class AccountModule {}
