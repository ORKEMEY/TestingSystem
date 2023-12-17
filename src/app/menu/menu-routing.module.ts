import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import MenuComponent from './menu.component';
import NotFoundComponent from '../shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'menu/testmenu', pathMatch: 'full' },
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      { path: '', redirectTo: 'testmenu', pathMatch: 'full' },
      {
        path: 'testmenu',
        loadChildren: () => import('./test-menu/test-menu.module').then((m) => m.default),
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
