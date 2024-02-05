import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import MenuRoutingModule from './menu-routing.module';
import SharedModule from '../shared/shared.module';
import TestMenuModule from './test-menu/test-menu.module';
import QuestionMenuModule from './question-menu/question-menu.module';
import TestingModule from './testing/testing.module';
import AccountModule from './account/account.module';

import MenuComponent from './menu.component';
import UserMenuNavComponent from './user-menu-nav/user-menu-nav.component';

import TestVariantQuestionAddingService from './shared/test-var-question-adding.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MenuRoutingModule,
    SharedModule,
    TestMenuModule,
    QuestionMenuModule,
    TestingModule,
    AccountModule,
  ],
  declarations: [MenuComponent, UserMenuNavComponent],
  bootstrap: [],
  providers: [TestVariantQuestionAddingService],
  exports: [MenuComponent, UserMenuNavComponent],
})
export default class MenuModule {}
