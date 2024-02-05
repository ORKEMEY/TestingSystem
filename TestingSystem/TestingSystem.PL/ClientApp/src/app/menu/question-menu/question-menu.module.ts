import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import QuestionMenuRoutingModule from './question-menu-routing.module';
import SharedModule from '../../shared/shared.module';

import QuestionMenuComponent from './question-menu.component';
import QuestionSettingsComponent from './question-settings/question-settings.component';
import AnswersEditorComponent from './answers-editor/answers-editor.component';
import AnswerItemComponent from './answer-item/answer-item.component';

import BasicSettingsFormService from './shared/basic-settings-form.service';
import AnswerEditorFormService from './shared/answer-editor-form.service';
import AnswerFormService from './shared/answer-form.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    QuestionMenuRoutingModule,
    SharedModule,
  ],
  declarations: [
    QuestionMenuComponent,
    QuestionSettingsComponent,
    AnswersEditorComponent,
    AnswerItemComponent,
  ],
  bootstrap: [],
  providers: [BasicSettingsFormService, AnswerEditorFormService, AnswerFormService],
  exports: [
    QuestionMenuComponent,
    QuestionSettingsComponent,
    AnswersEditorComponent,
    AnswerItemComponent,
  ],
})
export default class QuestionMenuModule {}
