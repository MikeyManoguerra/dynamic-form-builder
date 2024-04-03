import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'inputError',
  standalone: true,
  pure: false, // :(
})
export class InputErrorPipe implements PipeTransform {

  transform(formControl: FormControl): unknown {
    return formControl.dirty && formControl.invalid;
  }

}
