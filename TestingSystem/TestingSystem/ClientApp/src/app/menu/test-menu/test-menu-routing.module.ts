import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import TestMenuComponent from './test-menu.component';
import TestListComponent from './test-list/test-list.component';
import TestSettingsComponent from './test-settings/test-settings.component';
import TestMenuNavComponent from './test-menu-nav/test-menu-nav.component';

import NotFoundComponent from '../../shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'tests/list', pathMatch: 'full' },
  {
    path: 'tests',
    component: TestMenuComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: TestListComponent },
      { path: 'settings/:id', component: TestSettingsComponent }, // (settings/5//nav:testmenunav)
      { path: 'testmenunav', component: TestMenuNavComponent, outlet: 'nav' },
    ],
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class TestRoutingModule {}
