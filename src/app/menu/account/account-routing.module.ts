import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import AccountComponent from './account.component';
import AccountAlterationComponent from './account-alteration/account-alteration.component';
import PasswordAlterationComponent from './password-alteration/password-alteration.component';
import LoginAlterationComponent from './login-alteration/login-alteration.component';

import NotFoundComponent from '../../shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'settings', pathMatch: 'full' },
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: 'settings', component: AccountAlterationComponent },
      { path: 'password', component: PasswordAlterationComponent },
      { path: 'login', component: LoginAlterationComponent },
    ],
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class AccountRoutingModule {}
