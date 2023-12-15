import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import AdminPanelRoutingModule from './admin-panel-routing.module';

import SharedModule from '../shared/shared.module';

import AdminPanelComponent from './admin-panel.component';
import AdminPanelNavComponent from './admin-panel-nav/admin-panel-nav.component';
import AdminPanelTestsComponent from './admin-panel-tests/admin-panel-tests.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminPanelRoutingModule,

    SharedModule,
  ],
  declarations: [
    AdminPanelComponent,
    AdminPanelNavComponent,
    AdminPanelTestsComponent,
  ],
  exports: [
    AdminPanelComponent,
    AdminPanelNavComponent,
    AdminPanelTestsComponent,
  ],
})
export default class AdminPanelModule {}
