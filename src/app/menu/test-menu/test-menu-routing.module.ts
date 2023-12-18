import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import TestMenuComponent from './test-menu.component';
import TestListComponent from './test-list/test-list.component';

import NotFoundComponent from '../../shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'tests/list', pathMatch: 'full' },
  {
    path: 'tests',
    component: TestMenuComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: TestListComponent },
    ],
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class TestRoutingModule {}
