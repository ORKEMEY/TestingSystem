import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import UserRoutingModule from './user-routing.module';
// components
import UserComponent from './user.component';
import LoginComponent from './login/login.component';
import RegistrationComponent from './registration/registration.component';
// services
import UserRegistrationService from './shared/user-registration.service';
import UserLoginService from './shared/user-login.service';
import CredentialsService from '../core/services/credentials.service';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, UserRoutingModule],
  declarations: [UserComponent, LoginComponent, RegistrationComponent],
  bootstrap: [],
  providers: [UserRegistrationService, UserLoginService, CredentialsService], // service registration
  exports: [UserComponent, LoginComponent, RegistrationComponent],
})
export default class UserModule {}
