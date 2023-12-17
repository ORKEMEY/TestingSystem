import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import TestMenuRoutingModule from './test-menu-routing.module';
import SharedModule from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TestMenuRoutingModule,
    SharedModule,
  ],
  declarations: [],
  bootstrap: [],
  providers: [],
  exports: [],
})
export default class TestMenuModule {}
