import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';

import { skipWhile, map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return new Observable<boolean>((observer) => {
    authService.signedin$
      .pipe(
        skipWhile((value): any => value === null),
        map((isAuthenticated: boolean) => {
          if (isAuthenticated) {
            return true;
          } else {
            router.navigate(['/']);
            return false;
          }
        }),
        take(1)
      )
      .subscribe((canActivate) => {
        observer.next(canActivate);
        observer.complete();
      });
  });
};
