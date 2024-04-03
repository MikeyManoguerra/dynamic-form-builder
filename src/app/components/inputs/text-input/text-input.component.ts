import { Component, ElementRef, Input, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomQuestion } from '../../../models/question';
import { CommonModule } from '@angular/common';
import { InputErrorPipe } from '../../../pipes/input-error.pipe';

@Component({
  selector: 'text-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputErrorPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ],
  template: `
    <label [for]="question.slug">{{ question.label }}<span *ngIf="question.required">*</span></label>
    <input
      #input
      [id]="question.slug"
      [formControl]="control"
      type="text"
      [ngClass]="{'border-red-500': control | inputError }"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
  `,
  styleUrl: './text-input.component.css'
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() question!: DomQuestion;
  @ViewChild('input', { static: true }) elementRef!: ElementRef<HTMLInputElement>;

  control: FormControl = new FormControl();

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any) {
    this.control.setValue(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
    this.control.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }
}
