import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export function uniqueUsername(
  authService: AuthService,
  getOrgId: any
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const { value } = control;
    const orgId = getOrgId();

    if (!value && !orgId) return null;

    return authService.usernameAvailable(value, orgId).pipe(
      map((result: any) => {
        if (result.available) {
          return null;
        } else {
          return { nonUniqueUsername: true };
        }
      }),
      catchError((err) => {
        return of({ noConnection: true });
      })
    );
  };
}
