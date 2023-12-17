import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import MenuRoutingModule from './menu-routing.module';
import SharedModule from '../shared/shared.module';
import TestMenuModule from './test-menu/test-menu.module';

import MenuComponent from './menu.component';
import UserMenuNavComponent from './user-menu-nav/user-menu-nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MenuRoutingModule,
    SharedModule,
    TestMenuModule,
  ],
  declarations: [MenuComponent, UserMenuNavComponent],
  bootstrap: [],
  providers: [],
  exports: [MenuComponent, UserMenuNavComponent],
})
export default class MenuModule {}
