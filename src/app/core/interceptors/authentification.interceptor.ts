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
import { Observable, throwError } from 'rxjs';
import { mergeMap, retryWhen, catchError } from 'rxjs/operators';
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

    let count = 1;

    return next.handle(authReq).pipe(
      retryWhen((errors) =>
        errors.pipe(
          mergeMap((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401 && count > 0) {
              count -= 1;
              return this.userService
                .refreshToken()
                .pipe(catchError(() => throwError(() => error)));
            }
            return throwError(() => error);
          }),
        ),
      ),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (this.check401(error)) return throwError(() => error);
          this.check403(error);
        }
        return throwError(() => error);
      }),
    );
  }

  check401(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.router.navigate(['/users']);
      console.error('Unauthorized');
      return true;
    }
    return false;
  }

  check403(error: HttpErrorResponse) {
    if (error.status === 402) {
      this.router.navigate(['/forbidden']);
      console.error('Forbidden');
      return true;
    }
    return false;
  }
}
