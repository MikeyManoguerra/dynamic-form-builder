import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function getSlug(form: Record<string, FormControl<any>>, key: string) {
  if (form['slug'].value) return form['slug'].value;

  return toSlug(form[key].value as string);
}

export function toSlug(title: string) {
  return title.toLowerCase().trim().replaceAll(new RegExp(/[^a-z0-9\s]/g), '').replaceAll(new RegExp(/\s{1,}/g), '-');
}

// TODO move somewhere else
export function slugValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }


    // const slugValid = new RegExp(/^[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?$/).test(value);
    const slugValid = new RegExp(/^[a-z0-9\-]+$/).test(value);
    const startEndValid = value[0] !== '-' && value.charAt(value.length - 1) !== '-'

    if (!slugValid) return { slugPattern: true };
    if (!startEndValid) return { dashPattern: true };
    return null;
  }
}

