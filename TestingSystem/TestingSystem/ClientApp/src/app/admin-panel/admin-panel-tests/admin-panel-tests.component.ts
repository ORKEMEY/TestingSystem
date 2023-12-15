import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'admin-panel-tests',
  templateUrl: './admin-panel-tests.component.html',
  styleUrls: ['./admin-panel-tests.component.css'],
})
export default class AdminPanelTestsComponent {
  @ViewChild('alertDiv', { static: false })
  alertDiv: ElementRef | undefined;
}
