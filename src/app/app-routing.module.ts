import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import NotFoundComponent from './shared/not-found.component';
import ForbiddenComponent from './shared/forbidden.component';

// import AuthGuard from './core/guards/auth.guard';

const appRoutes: Routes = [
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
