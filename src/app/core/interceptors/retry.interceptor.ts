import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retryWhen, mergeMap } from 'rxjs/operators';

@Injectable()
export default class RetryInterceptor implements HttpInterceptor {
  constructor(@Inject('attemptNum') private readonly attemptNum: number) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let retryCount = this.attemptNum;
    return next.handle(req).pipe(
      retryWhen((errors) => {
        return errors.pipe(
          mergeMap((error) => {
            if (error instanceof HttpErrorResponse && error.status < 500 && error.status !== 408) {
              return throwError(() => error);
            }
            retryCount -= 1;
            return retryCount >= 0 ? of(error) : throwError(() => error);
          }),
        );
      }),
    );
  }
}
