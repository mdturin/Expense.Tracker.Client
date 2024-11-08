import { AbstractControl, ValidatorFn } from '@angular/forms';

export function matchStringArrayValidator(validStrings: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = validStrings.includes(control.value);
    return isValid
      ? null
      : { matchStringArray: { valid: false, value: control.value } };
  };
}

export function noneMatchStringArrayValidator(
  validStrings: string[]
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = validStrings.includes(control.value);
    return isValid
      ? { noneMatchStringArray: { valid: false, value: control.value } }
      : null;
  };
}
