import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import TestMenuRoutingModule from './test-menu-routing.module';
import SharedModule from '../../shared/shared.module';

import TestMenuComponent from './test-menu.component';
import TestListComponent from './test-list/test-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TestMenuRoutingModule,
    SharedModule,
  ],
  declarations: [TestMenuComponent, TestListComponent],
  bootstrap: [],
  providers: [],
  exports: [TestMenuComponent, TestListComponent],
})
export default class TestMenuModule {}
