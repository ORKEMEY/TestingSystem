import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import TestMenuRoutingModule from './test-menu-routing.module';
import SharedModule from '../../shared/shared.module';

import TestMenuComponent from './test-menu.component';
import TestListComponent from './test-list/test-list.component';
import TestListItemComponent from './test-list-item/test-list-item.component';
import TestSettingsComponent from './test-settings/test-settings.component';
import TestMenuNavComponent from './test-menu-nav/test-menu-nav.component';

import BasicSettingsFormService from './shared/basic-settings-form.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TestMenuRoutingModule,
    SharedModule,
  ],
  declarations: [
    TestMenuComponent,
    TestListComponent,
    TestListItemComponent,
    TestSettingsComponent,
    TestMenuNavComponent,
  ],
  bootstrap: [],
  providers: [BasicSettingsFormService],
  exports: [
    TestMenuComponent,
    TestListComponent,
    TestListItemComponent,
    TestSettingsComponent,
    TestMenuNavComponent,
  ],
})
export default class TestMenuModule {}
