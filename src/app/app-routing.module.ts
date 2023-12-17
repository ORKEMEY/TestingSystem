import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import NotFoundComponent from './shared/not-found/not-found.component';
import ForbiddenComponent from './shared/forbidden/forbidden.component';

import AuthGuard from './core/guards/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then((m) => m.default),
  },
  {
    path: 'admin-panel',
    loadChildren: () => import('./admin-panel/admin-panel.module').then((m) => m.default),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'menus',
    loadChildren: () => import('./menu/menu.module').then((m) => m.default),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
