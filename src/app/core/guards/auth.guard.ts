import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import CredentialsService from '../services/credentials.service';

@Injectable()
export default class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private credentialsService: CredentialsService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    if (!this.credentialsService.isLoggedIn()) {
      this.router.navigate(['/users']);
      console.error('Unauthorized');
      return false;
    }

    return true;
  }

  canActivateChild(): Observable<boolean> | boolean {
    return this.canActivate();
  }
}
