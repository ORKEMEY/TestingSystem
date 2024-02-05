import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'testing-system-app',
  templateUrl: './app.component.html',
})
export default class AppComponent implements OnInit {
  constructor() {
    console.log('AppComponent constructor');
  }

  public ngOnInit(): void {
    console.log('AppComponent ngOnInit()');
  }
}
