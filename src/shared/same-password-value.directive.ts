import { ValidatorFn, AbstractControl } from '@angular/forms';

export function samePasswordValueValidator(controlName): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let isMatching = true;

    if (control.root.get(controlName)) {
      isMatching = control.value === control.root.get(controlName).value;
    }

    return isMatching ? null : { notMatching: { value: control.value } };
  };
}
