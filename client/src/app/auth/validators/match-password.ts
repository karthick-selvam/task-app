import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordsMatchValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value === confirmPassword.value
    ) {
      // If passwords match, clear any existing error on confirmPassword control
      if (
        confirmPassword.errors &&
        confirmPassword.errors?.['passwordsDontMatch']
      ) {
        delete confirmPassword.errors?.['passwordsDontMatch'];
        confirmPassword.setErrors(
          Object.keys(confirmPassword.errors).length !== 0
            ? confirmPassword.errors
            : null
        );
      }
    } else {
      // If passwords don't match, set the error on confirmPassword control
      confirmPassword?.setErrors({ passwordsDontMatch: true });
    }

    return null; // Since we are setting errors directly, always return null here
  };
}
