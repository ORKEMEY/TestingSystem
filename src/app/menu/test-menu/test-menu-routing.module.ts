import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import TestMenuComponent from './test-menu.component';

import NotFoundComponent from '../../shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'tests', pathMatch: 'full' },
  {
    path: 'tests',
    component: TestMenuComponent,
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class TestRoutingModule {}
