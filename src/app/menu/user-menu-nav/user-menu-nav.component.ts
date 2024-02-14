import { Component } from '@angular/core';

import UserService from '../../core/services/user.service';

@Component({
  selector: 'user-menu-nav-component',
  templateUrl: './user-menu-nav.component.html',
  styleUrls: ['./user-menu-nav.component.scss'],
})
export default class UserMenuNavComponent {
  constructor(private userService: UserService) {}

  LogOut() {
    this.userService.logOut();
  }
}
