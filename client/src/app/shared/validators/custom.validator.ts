import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CountryCode, isValidPhoneNumber } from 'libphonenumber-js';

export function customEmailValidator(
  control: AbstractControl
): ValidationErrors | null {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const valid = emailRegex.test(control.value);

  return control.value && !valid ? { invalidEmail: true } : null;
}

export function emailListValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      !control.value ||
      !control.value.length ||
      typeof control.value != 'string'
    ) {
      return null;
    }

    // Split the input string into an array of email addresses using commas as separators
    const emails = control.value
      ?.split(',')
      .map((email: string) => email.trim());

    // Regular expression for validating an Email
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    // Limit the number of emails to 20
    if (emails.length > 20) {
      return { emailLimitReached: true };
    }

    // Validate each email address
    for (const email of emails) {
      if (email.length && !emailRegex.test(email)) {
        return { invalidEmail: true, invalidEmailValue: email };
      }
    }

    return null; // Return null if all emails are valid
  };
}

export function mobileNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      !control.value ||
      (!control.value.length && typeof control.value != 'string')
    ) {
      return null;
    }

    // Split the input string into an array of phone numbers using commas as separators
    const phoneNumbers = control.value
      .split(',')
      .map((phone: string) => phone.trim());

    // Limit the number of emails to 20
    if (phoneNumbers.length > 20) {
      return { phoneNumberLimitReached: true };
    }
    for (const phoneNumberString of phoneNumbers) {
      // Extract the country code from the phone number
      const countryCodeMatch = phoneNumberString.match(/^\+(\d{1,3})\s/);
      const countryCode = countryCodeMatch
        ? (countryCodeMatch[1] as CountryCode)
        : undefined;

      // Parse the phone number without the '+' and country code prefix
      const phoneNumberWithoutCountryCode = phoneNumberString.replace(
        /^\+\d{1,3}\s/,
        ''
      );

      if (!isValidPhoneNumber(phoneNumberWithoutCountryCode, 'IN')) {
        return {
          invalidWhatsapp: true,
          invalidWhatsappValue: phoneNumberString,
        };
      }
    }

    return null;
  };
}

export function indianPhoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const indianPhoneNumberRegex = /^[6789]\d{9}$/;

    if (control.value && !indianPhoneNumberRegex.test(control.value)) {
      return { invalidPhoneNumber: true };
    }

    return null;
  };
}

export function indianVehicleNumberValidator() {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const vehicleNumber = control.value;
    if (vehicleNumber) {
      const regex = /^[A-Z]{2}\s?\d{1,2}\s?[A-Z]{0,3}\s?\d{1,4}$/;

      if (vehicleNumber && !regex.test(vehicleNumber)) {
        return { invalidVehicleNumber: true };
      }
    }

    return null;
  };
}
