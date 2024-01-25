import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private location: Location, private router: Router) {}

  activateBtn(name: string) {
    Object.keys(this.isBtnActive).forEach((key) => {
      this.isBtnActive[key] = false;
    });
    this.isBtnActive[name] = true;
  }

  back() {
    const prevPath = localStorage.getItem('prev');
    if (prevPath) {
      this.router.navigateByUrl(prevPath);
    } else this.location.back();
  }
}
