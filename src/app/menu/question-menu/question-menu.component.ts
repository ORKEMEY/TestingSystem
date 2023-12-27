import { Component } from '@angular/core';

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

  activateBtn(name: string) {
    Object.keys(this.isBtnActive).forEach((key) => {
      this.isBtnActive[key] = false;
    });
    this.isBtnActive[name] = true;
  }
}
