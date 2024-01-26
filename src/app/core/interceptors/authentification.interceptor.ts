import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import CredentialsService from '../services/credentials.service';

@Injectable()
export default class AuthInterceptor implements HttpInterceptor {
  constructor(private credentialsService: CredentialsService) {}

  setAccessToken(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.credentialsService.getToken()}`),
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = this.setAccessToken(req);

    return next.handle(authReq);
  }
}
