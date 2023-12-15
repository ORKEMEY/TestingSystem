import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import UserComponent from './user.component';
import LoginComponent from './login/login.component';
import RegistrationComponent from './registration/registration.component';

import NotFoundComponent from '../shared/not-found/not-found.component';

// routes definition
const appRoutes: Routes = [
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: '**', redirectTo: 'user/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export default class UserRoutingModule {}
