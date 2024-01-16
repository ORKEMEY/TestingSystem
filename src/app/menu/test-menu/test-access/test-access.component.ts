import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import MessageBox from '../../../core/utils/msg-box';

@Component({
  selector: 'test-access-component',
  templateUrl: './test-access.component.html',
  styleUrls: ['./test-access.component.css'],
  animations: [fadeInOnEnterAnimation({ duration: 130 })],
})
export default class TestAccessComponent extends MessageBox {
  get AccessLink(): string {
    if (this.id === 0) {
      return 'Oops, no link found!';
    }
    return `${window.location.origin}/menus/menu/testing/test/${this.id}`;
  }

  private id: number = 0;

  constructor(private activatedRoute: ActivatedRoute) {
    super();
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
}
