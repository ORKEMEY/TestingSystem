import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'test-access-component',
  templateUrl: './test-access.component.html',
  styleUrls: ['./test-access.component.css'],
})
export default class TestAccessComponent {
  isWarningVisible: Boolean = false;

  isInfoVisible: Boolean = false;

  warningMessage: string = '';

  infoMessage: string = '';

  get AccessLink(): string {
    if (this.id === 0) {
      return 'Oops, no link found!';
    }
    return `${window.location.origin}/menus/menu/testing/test/${this.id}`;
  }

  private id: number = 0;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.id = Number.parseInt(params.id, 10);
    });

    if (this.id === 0) {
      this.Warn('Firstly create test!');
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

  Warn(msg: string) {
    this.warningMessage = msg;
    this.isWarningVisible = true;
  }

  hideWarning() {
    this.warningMessage = '';
    this.isWarningVisible = false;
  }
}
