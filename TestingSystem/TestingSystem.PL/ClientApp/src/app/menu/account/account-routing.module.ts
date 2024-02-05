import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import AccountComponent from './account.component';

import NotFoundComponent from '../../shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: './', pathMatch: 'full' },
  {
    path: './',
    component: AccountComponent,
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class AccountRoutingModule {}
