import { Component } from '@angular/core';

@Component({
  selector: 'test-menu-nav-component',
  templateUrl: './test-menu-nav.component.html',
  styleUrls: ['./test-menu-nav.component.css'],
})
export default class TestMenuNavComponent {
  public isBtnActive: Object = {
    BasicSettings: true,
    QuestionsManager: false,
    TestAccess: false,
    Results: false,
  };

  activateBtn(name: string) {
    Object.keys(this.isBtnActive).forEach((key) => {
      this.isBtnActive[key] = false;
    });
    this.isBtnActive[name] = true;
  }
}
