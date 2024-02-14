import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { expandOnEnterAnimation, collapseOnLeaveAnimation } from 'angular-animations';
import CredentialsService from '../../core/services/credentials.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    expandOnEnterAnimation({ duration: 300 }),
    collapseOnLeaveAnimation({ duration: 300 }),
  ],
})
export default class SidebarComponent implements AfterViewInit {
  public isSidebarCollapsed: boolean = true;

  public isAccountSubMenuCollapsed: boolean = true;

  public Login: string = this.credentialsService.getLogin()?.trim();

  public get Logo(): string {
    return this.Login?.[0] || '+';
  }

  public get Gratitude(): string {
    if (this.Login) {
      let str = `Hello, ${this.Login}`;
      if (this.isGratitudeElOverflown) str += ' * ';
      return str;
    }
    return 'Menu';
  }

  @ViewChild('gratitudeEl', { static: false })
  public GratitudeEl: ElementRef | undefined;

  public isGratitudeElOverflown: boolean = false;

  constructor(private credentialsService: CredentialsService) {}

  ngAfterViewInit(): void {
    this.isGratitudeElOverflown =
      this.GratitudeEl.nativeElement.scrollWidth > this.GratitudeEl.nativeElement.clientWidth;
  }

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
