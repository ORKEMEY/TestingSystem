import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'question-menu-component',
  templateUrl: './question-menu.component.html',
  styleUrls: ['./question-menu.component.css'],
})
export default class QuestionMenuComponent {
  public isBtnActive: Object = {
    BasicSettings: true,
    AnswersEditor: false,
  };

  questionId: number = 0;

  constructor(private activatedRoute: ActivatedRoute) {
    this.questionId = Number.parseInt(this.activatedRoute.snapshot.params.id, 10);
  }

  activateBtn(name: string) {
    Object.keys(this.isBtnActive).forEach((key) => {
      this.isBtnActive[key] = false;
    });
    this.isBtnActive[name] = true;
  }
}
