import { Component } from '@angular/core';

@Component({
  selector: 'garland',
  templateUrl: './garland.component.html',
  styleUrls: ['./garland.component.scss'],
})
export default class GarlandComponent {
  public isVisible: boolean = false;

  constructor() {
    const now = new Date();
    const mon = now.getMonth();
    const day = now.getDate();

    if (mon === 11 && day > 15) this.isVisible = true;
    if (mon === 0 && day < 15) this.isVisible = true;
  }
}
