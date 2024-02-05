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
import QuestionsManagerComponent from './questions-manager/questions-manager.component';
import QuestionsListComponent from './questions-list/questions-list.component';
import QuestionsListItemComponent from './questions-list-item/questions-list-item.component';
import TestAccessComponent from './test-access/test-access.component';
import TestResultsComponent from './test-results/test-results.component';

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
    QuestionsManagerComponent,
    QuestionsListComponent,
    QuestionsListItemComponent,
    TestAccessComponent,
    TestResultsComponent,
  ],
  bootstrap: [],
  providers: [BasicSettingsFormService],
  exports: [
    TestMenuComponent,
    TestListComponent,
    TestListItemComponent,
    TestSettingsComponent,
    TestMenuNavComponent,
    QuestionsManagerComponent,
    QuestionsListComponent,
    QuestionsListItemComponent,
    TestAccessComponent,
    TestResultsComponent,
  ],
})
export default class TestMenuModule {}
