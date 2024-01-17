import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import WarningBoxHandler from '../../../shared/utils/warning-box-handler';

@Component({
  selector: 'test-access-component',
  templateUrl: './test-access.component.html',
  styleUrls: ['./test-access.component.css'],
  animations: [fadeInOnEnterAnimation({ duration: 130 })],
})
export default class TestAccessComponent {
  get AccessLink(): string {
    if (this.id === 0) {
      return 'Oops, no link found!';
    }
    return `${window.location.origin}/menus/menu/testing/test/${this.id}`;
  }

  WarningBox: WarningBoxHandler = new WarningBoxHandler();

  private id: number = 0;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.id = Number.parseInt(params.id, 10);
    });

    if (this.id === 0) {
      this.WarningBox.Warn('Firstly create test!');
    }
  }

  public CopyBtnStr: string = 'Copy';

  copy() {
    navigator.clipboard.writeText(this.AccessLink);
    this.CopyBtnStr = 'Copied!';
    setTimeout(() => {
      this.CopyBtnStr = 'Copy';
    }, 5000);
  }
}
