import { Component } from '@angular/core';
import { Router } from '@angular/router';
import UserServise from '../../core/services/user.service';

@Component({
  selector: 'forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css'],
})
export default class ForbiddenComponent {
  constructor(private userService: UserServise, private router: Router) {}

  LogOut() {
    this.userService.logOut();
  }
}
