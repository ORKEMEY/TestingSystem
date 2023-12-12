import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Observer, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import CredentialsService from '../services/credentials.service';
import UserService from '../services/user.service';

@Injectable()
export default class AuthInterceptor implements HttpInterceptor {
  // readonly RefreshTokenAttemptsNumKey: string = 'x-ref-token-attempt-num';

  constructor(
    private credentialsService: CredentialsService,
    private router: Router,
    private userService: UserService,
    private http: HttpClient,
  ) {}

  setAccessToken(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.credentialsService.getToken()}`),
    });
  }

  /* setRefreshTokenAttempts(req: HttpRequest<any>, attemptsNum: number): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set(this.RefreshTokenAttemptsNumKey, String(attemptsNum)),
    });
  }

  getRefreshTokenAttempts(req: HttpRequest<any>): number {
    const valStr = req.headers.get(this.RefreshTokenAttemptsNumKey);
    if (valStr) {
      return Number.parseInt(valStr, 10);
    }
    return 0;
  }

  isRefreshTokenAttemptsSet(req: HttpRequest<any>): boolean {
    return req.headers.has(this.RefreshTokenAttemptsNumKey);
  } */

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = this.setAccessToken(req);

    /* if (!this.isRefreshTokenAttemptsSet(authReq)) {
      authReq = this.setRefreshTokenAttempts(authReq, 3);
    } else {
      const att = this.getRefreshTokenAttempts(authReq);
      authReq = this.setRefreshTokenAttempts(authReq, att - 1);
    } */

    return next.handle(authReq).pipe(
      catchError((error) => {
        const subj: Subject<HttpEvent<any>> = new Subject<HttpEvent<any>>();

        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.userService.refreshToken({
            next: () => {
              /* const att = this.getRefreshTokenAttempts(authReq);
              if (att > 0) { */
              this.http.request(authReq).subscribe({
                next: (data) => subj.next(data),
                error: (msg) => subj.error(msg),
              });
              /* } else {
                subj.error(error);
              } */
            },
            error: (msg) => {
              console.log(authReq);
              subj.error(msg);
            },
          } as Observer<void>);
        } else {
          subj.error(error);
        }
        return subj.asObservable();
      }),
      tap({
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/users']);
              console.error('Unauthorized');
            } else if (err.status === 403) {
              this.router.navigate(['/forbidden']);
              console.error('Forbidden');
            }
          }
        },
      }),
    );
  }
}
