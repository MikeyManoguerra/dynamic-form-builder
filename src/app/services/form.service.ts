import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderedPipe } from '../pipes/ordered.pipe';

@Injectable({
  providedIn: 'root'

})
export class FormService {

  constructor() { }

  buildForm(questions: Question[]) {
    const controls = new OrderedPipe().transform(questions).reduce((prev, { slug, required }) => {
      // initial value?
      const validators = [];

      if (required) validators.push(Validators.required);
      return { ...prev, [slug]: new FormControl('', validators) }
    }, {});
    return new FormGroup(controls);
  }
}
