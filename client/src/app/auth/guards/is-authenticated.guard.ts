import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, skipWhile, take } from 'rxjs/operators';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return new Observable<boolean>((observer) => {
    authService.signedin$
      .pipe(
        skipWhile((value): any => value === null),
        map((isAuthenticated: boolean) => {
          if (isAuthenticated) {
            router.navigate(['/dashboard']);
            return false;
          }
          return true;
        }),
        catchError((err) => {
          router.navigate(['/auth']);
          return of(false);
        }),
        take(1)
      )
      .subscribe((canActivate) => {
        observer.next(canActivate);
        observer.complete();
      });
  });
};
