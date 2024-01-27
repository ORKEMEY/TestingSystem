import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'test-menu-nav-component',
  templateUrl: './test-menu-nav.component.html',
  styleUrls: ['./test-menu-nav.component.scss'],
})
export default class TestMenuNavComponent {
  public isBtnActive: Object = {
    BasicSettings: true,
    QuestionsManager: false,
    TestAccess: false,
    Results: false,
  };

  testId: number = 0;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.testId = Number.parseInt(params.id, 10);
    });
  }

  activateBtn(name: string) {
    Object.keys(this.isBtnActive).forEach((key) => {
      this.isBtnActive[key] = false;
    });
    this.isBtnActive[name] = true;
  }
}
