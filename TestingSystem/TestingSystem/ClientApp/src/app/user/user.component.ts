import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'user-component',
  templateUrl: './user.component.html',
})
export default class UserComponent {
  public get isRegistrationRoute(): boolean {
    return this.router.url.split('/').includes('registration');
  }

  public get btnSignInUpName(): string {
    return this.isRegistrationRoute ? 'Sign in' : 'Sign up';
  }

  public get btnSignInUpHref(): string {
    return this.isRegistrationRoute ? 'login' : 'registration';
  }

  constructor(private router: Router) {}
}
