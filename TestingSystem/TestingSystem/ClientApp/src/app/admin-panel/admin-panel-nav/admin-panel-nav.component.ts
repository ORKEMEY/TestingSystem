import { Component } from '@angular/core';
import { Router } from '@angular/router';
import UserServise from '../../core/services/user.service';

@Component({
  selector: 'admin-panel-nav-component',
  templateUrl: './admin-panel-nav.component.html',
  styleUrls: ['./admin-panel-nav.component.scss'],
})
export default class AdminPanelNavComponent {
  constructor(private userService: UserServise, private router: Router) {}

  LogOut() {
    this.userService.logOut();
  }
}
