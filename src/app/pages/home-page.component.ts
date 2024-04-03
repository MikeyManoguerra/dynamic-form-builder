import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../layouts/default-layout/default-layout.component';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
import { Question } from '../models/question';
import { FormsStateService } from '../services/forms-state.service';
import { CommonModule } from '@angular/common';
import { FormsListComponent } from '../components/forms-list/forms-list.component';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [DefaultLayoutComponent, FormsListComponent, DynamicFormComponent, CommonModule],
  template: `
    <default-layout>
      <forms-list [forms$]="forms$"></forms-list>
      <!-- <dynamic-form [questions]="questions"></dynamic-form> -->
    </default-layout>
  `,
  styles: `

  `
})
export class HomePageComponent {
  constructor(private formStateService: FormsStateService) { }

  forms$ =  this.formStateService.forms$;

  ngOnInit() { }

  questions: Question[] = [
    {
      label: 'Describe the First Question',
      type: 'text',
      slug: 'the-first-question',
      order: 1,
      required: true,
    },
    {
      label: 'Describe the Second Question',
      type: 'text',
      slug: 'the-second-question',
      order: 2,
      required: true,
    },
    {
      label: 'Describe the Third Question',
      type: 'text-area',
      slug: 'the-third-question',
      order: 3,
      required: false,
    },
    {
      label: 'Describe the Select',
      type: 'select',
      slug: 'the-fourth-question',
      order: 4,
      required: true,
      options: [
        { value: 'Option One', slug: 'option-one' },
        { label: 'The second option', value: 'Option Two', slug: 'option-two' }
      ]
    },
  ];
}
