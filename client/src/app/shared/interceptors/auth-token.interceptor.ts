import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getJwtToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: token,
        },
      });
    }

    return next.handle(req);
  }
}
