import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import QuestionMenuComponent from './question-menu.component';
import QuestionSettingsComponent from './question-settings/question-settings.component';
import AnswersEditorComponent from './answers-editor/answers-editor.component';

import NotFoundComponent from '../../shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'question/0', pathMatch: 'full' },
  {
    path: 'question/:id',
    component: QuestionMenuComponent,
    children: [
      { path: 'settings', component: QuestionSettingsComponent },
      { path: 'answerseditor', component: AnswersEditorComponent },
      { path: '**', component: NotFoundComponent, pathMatch: 'full' },
    ],
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class QuestionMenuRoutingModule {}
