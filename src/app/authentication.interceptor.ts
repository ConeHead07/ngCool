import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private authToken = '';

  constructor() {
    this.authToken = this.getAuthToken(environment.apiUser, environment.apiUser);
  }

  getAuthToken(user: string, pw: string): string {
    return btoa(`${environment.apiUser}:${environment.apiUser}`);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = btoa("coolSchrank01:smartFrx01");
    request = request.clone({
      setHeaders: { Authorization: `Basic  ${this.authToken}` }
    });

    return next.handle(request);
  }
}
