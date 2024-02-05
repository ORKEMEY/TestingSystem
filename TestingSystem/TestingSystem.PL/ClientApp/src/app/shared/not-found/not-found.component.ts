import { Component } from '@angular/core';
import { Router } from '@angular/router';
import UserServise from '../../core/services/user.service';

@Component({
  selector: 'not-found-component',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export default class NotFoundComponent {
  constructor(private userService: UserServise, private router: Router) {}

  LogOut() {
    this.userService.logOut();
  }
}
