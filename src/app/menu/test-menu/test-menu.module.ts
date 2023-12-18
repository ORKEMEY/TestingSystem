import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import TestMenuRoutingModule from './test-menu-routing.module';
import SharedModule from '../../shared/shared.module';

import TestMenuComponent from './test-menu.component';
import TestListComponent from './test-list/test-list.component';
import TestListItemComponent from './test-list-item/test-list-item.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TestMenuRoutingModule,
    SharedModule,
  ],
  declarations: [TestMenuComponent, TestListComponent, TestListItemComponent],
  bootstrap: [],
  providers: [],
  exports: [TestMenuComponent, TestListComponent, TestListItemComponent],
})
export default class TestMenuModule {}
