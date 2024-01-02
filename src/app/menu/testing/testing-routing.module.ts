import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import TestingComponent from './testing.component';
import TestComponent from './test/test.component';

import NotFoundComponent from '../../shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'test', pathMatch: 'full' },
  {
    path: 'test',
    component: TestingComponent,
    children: [{ path: ':id', component: TestComponent }],
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class TestingModule {}
