import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicInputDirective } from '../../directives/dynamic-input.directive';
import { FormService } from '../../services/form.service';
import { Form } from '../../models/form';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DynamicInputDirective, RouterModule],
  template: `
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">{{form.title}}</h2>
      <div class="flex gap-2">
        <a
          routerLink="edit"
          class="underline hover:no-underline"
        >Edit</a>
      </div>
    </div>

    <form [formGroup]="domForm" (ngSubmit)="onSubmit()">
      <ng-container
        *ngFor="let question of form.questions"
        [formControlName]="question.slug"
        [dynamicInput]="question"
      ></ng-container>
      <div class="flex justify-end pt-5">
        <input
          [disabled]="this.domForm.invalid"
          type="submit"
          class="bg-violet-500 hover:bg-violet-700 text-amber-100 font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:pointer-events-none"
        >
      </div>
    </form>
  `,
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent {

  // TODO take a form object (with question arrays in groups)?
  // add validators to question
  // question base takes type?
  @Input() form!: Form;

  domForm!: FormGroup;

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.domForm = this.formService.buildForm(this.form.questions);
  }

  onSubmit() {
    alert(JSON.stringify(this.domForm.value, null, 2));
  }
}
