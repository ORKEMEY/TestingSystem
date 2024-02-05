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
import { mergeMap, catchError } from 'rxjs/operators';
import UserService from '../services/user.service';

@Injectable()
export default class AuthTokenRefreshInterceptor implements HttpInterceptor {
  constructor(private router: Router, private userService: UserService, private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.userService.refreshToken().pipe(
            mergeMap(() => {
              return this.http.request<any>(req);
            }),
            catchError(() => {
              return throwError(() => error);
            }),
          );
        }

        return throwError(() => error);
      }),
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
