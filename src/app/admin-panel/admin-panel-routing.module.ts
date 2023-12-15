import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import AdminPanelComponent from './admin-panel.component';
import AdminPanelNavComponent from './admin-panel-nav/admin-panel-nav.component';
import AdminPanelTestsComponent from './admin-panel-tests/admin-panel-tests.component';

import NotFoundComponent from '../shared/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin-panel/menu/(tests//nav:adminmenunav)', pathMatch: 'full' },
  {
    path: 'menu',
    component: AdminPanelComponent,
    children: [
      { path: 'tests', component: AdminPanelTestsComponent },
      { path: 'adminmenunav', component: AdminPanelNavComponent, outlet: 'nav' },
      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class AdminPanelRoutingModule {}
