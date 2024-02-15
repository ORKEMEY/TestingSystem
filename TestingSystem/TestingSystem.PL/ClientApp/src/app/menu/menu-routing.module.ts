import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import MenuComponent from './menu.component';
import NotFoundComponent from '../shared/not-found/not-found.component';
import SettingsComponent from './settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: 'menu/testmenu', pathMatch: 'full' },
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      { path: '', redirectTo: 'testmenu', pathMatch: 'full' },
      { path: 'settings', component: SettingsComponent },
      {
        path: 'testmenu',
        loadChildren: () => import('./test-menu/test-menu.module').then((m) => m.default),
      },
      {
        path: 'questionmenu',
        loadChildren: () => import('./question-menu/question-menu.module').then((m) => m.default),
      },
      {
        path: 'testing',
        loadChildren: () => import('./testing/testing.module').then((m) => m.default),
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then((m) => m.default),
      },
      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class MenuRoutingModule {}
