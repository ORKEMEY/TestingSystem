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

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = this.setAccessToken(req);

    return next.handle(authReq).pipe(
      catchError((error) => {
        const subj: Subject<HttpEvent<any>> = new Subject<HttpEvent<any>>();

        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.userService.refreshToken().subscribe({
            next: () => {
              this.http.request(authReq).subscribe({
                next: (data) => subj.next(data),
                error: (msg) => subj.error(msg),
              });
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
