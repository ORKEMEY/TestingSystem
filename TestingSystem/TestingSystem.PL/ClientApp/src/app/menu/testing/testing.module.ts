import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import TestingRoutingModule from './testing-routing.module';
import SharedModule from '../../shared/shared.module';

import TestingComponent from './testing.component';
import TestComponent from './test/test.component';
import QuestionComponent from './question/question.component';
import ResultComponent from './result/result.component';

import TestCheckService from './shared/test-check.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TestingRoutingModule,
    SharedModule,
  ],
  declarations: [TestingComponent, TestComponent, QuestionComponent, ResultComponent],
  bootstrap: [],
  providers: [TestCheckService],
  exports: [TestingComponent, TestComponent, QuestionComponent, ResultComponent],
})
export default class TestingModule {}
