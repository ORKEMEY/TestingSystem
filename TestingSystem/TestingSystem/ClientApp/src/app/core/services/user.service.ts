/* eslint-disable no-bitwise */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { MD5, SHA256 } from 'crypto-js';
import User from '../models/user.model';
import Customer from '../models/customer.model';
import CredentialsService, { Credentials } from './credentials.service';

@Injectable({ providedIn: 'root' })
export default class UserService {
  constructor(private http: HttpClient, private credentialsService: CredentialsService) {}

  public getToken(user: User): Observable<void | Credentials> {
    this.HashPassword(user);
    return this.http.post('api/Users/token', user).pipe(
      catchError((err) => {
        if (err.status === 400) {
          throw err.error.errorText;
        }
        throw err;
      }),
      map((data) => data as Credentials),
      tap({
        next: (cred: Credentials) => {
          this.credentialsService.saveCredentials(cred);
        },
      }),
    );
  }

  public refreshToken(): Observable<void | Credentials> {
    const credentials = this.credentialsService.getCredentials();
    return this.http.post('api/Users/refresh', credentials).pipe(
      catchError((err) => {
        if (err.status === 400) {
          throw err.error.errorText;
        }
        throw err;
      }),
      map((data) => data as Credentials),
      tap({
        next: (cred: Credentials) => {
          this.credentialsService.saveCredentials(cred);
        },
      }),
    );
  }

  public post(user: User): Observable<void | Credentials> {
    this.HashPassword(user);
    return this.http.post('api/Users', user).pipe(
      catchError((err) => {
        if (err.status === 400) {
          throw err.error.errorText;
        }
        throw err;
      }),
      map((data) => data as Credentials),
      tap({
        next: (cred: Credentials) => {
          this.credentialsService.saveCredentials(cred);
        },
      }),
    );
  }

  public putCurrentUser(user: User): Observable<void | Credentials> {
    this.HashPassword(user);
    return this.http.put('api/Users/current', user).pipe(
      catchError((err) => {
        if (err.status === 400) {
          throw err.error.errorText;
        }
        throw err;
      }),
      map((data) => data as Credentials),
      tap({
        next: (cred: Credentials) => {
          this.credentialsService.saveCredentials(cred);
        },
      }),
    );
  }

  public getCurrentCustomer(): Observable<Customer> {
    return this.http.get('api/Users/current').pipe(
      catchError((err) => {
        if (err.status === 400) {
          throw err.error.errorText;
        }
        throw err;
      }),
      map((data) => data as Customer),
    );
  }

  public logOut() {
    this.credentialsService.deleteCredentials();
  }

  private async HashPassword(user: User) {
    const sol = MD5(user.login).toString();
    const pas = MD5(user.password).toString();

    const concat = [...sol].map((el, ind): number => el.charCodeAt(0) ^ pas.charCodeAt(ind));

    const res = String.fromCharCode(...concat);

    user.password = SHA256(res).toString();
    return user;
  }
}
