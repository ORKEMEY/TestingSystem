import { Component } from '@angular/core';
import { expandOnEnterAnimation, collapseOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    expandOnEnterAnimation({ duration: 300 }),
    collapseOnLeaveAnimation({ duration: 300 }),
  ],
})
export default class SidebarComponent {
  public isSidebarCollapsed: boolean = true;

  public isAccountSubMenuCollapsed: boolean = true;

  onCollapserClick() {
    if (!this.isSidebarCollapsed) {
      this.isAccountSubMenuCollapsed = true;
      this.isSidebarCollapsed = true;
    } else {
      this.isSidebarCollapsed = false;
    }
  }

  onAccountSubMenuClick() {
    this.isSidebarCollapsed = false;
    this.isAccountSubMenuCollapsed = !this.isAccountSubMenuCollapsed;
  }
}
