import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable, of, throwError, tap } from 'rxjs';
import { retryWhen, mergeMap, catchError } from 'rxjs/operators';

type RetryCount = { value: number };

@Injectable()
export default class RetryInterceptor implements HttpInterceptor {
  constructor(@Inject('attemptNum') private readonly attemptNum: number) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const retryCount: RetryCount = {
      value: this.attemptNum,
    };

    return next.handle(req).pipe(retryWhen((errors) => this.retryOnError(errors, retryCount)));
  }

  retryOnError(errors: Observable<any>, retryCount: RetryCount): Observable<any> {
    return errors.pipe(
      mergeMap((error) => {
        this.errorFilter(error);
        return this.retryOnCount(retryCount).pipe(
          catchError(() => {
            throw error;
          }),
        );
      }),
    );
  }

  retryOnCount(retryCount: RetryCount): Observable<any> {
    return retryCount.value > 0
      ? of(retryCount.value).pipe(
          tap(() => {
            retryCount.value -= 1;
          }),
        )
      : throwError(() => retryCount.value);
  }

  errorFilter(httpError) {
    if (httpError.status === 408) {
      return httpError;
    }
    if (httpError.status === 401) {
      return httpError;
    }
    if (httpError.status < 500) {
      throw httpError;
    }
    return httpError;
  }
}
