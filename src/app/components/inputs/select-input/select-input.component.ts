import { Component, Input, forwardRef } from '@angular/core';
import { DomQuestion  } from '../../../models/question';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputErrorPipe } from '../../../pipes/input-error.pipe';

@Component({
  selector: 'select-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputErrorPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true
    }
  ],
  template: `
    <label [for]="question.slug">{{ question.label }}<span *ngIf="question.required">*</span></label>
    <div class="relative">
      <select
        [id]="question.slug"
        [formControl]="control"
        [ngClass]="{'border-red-500': control | inputError }"
        class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option *ngFor="let item of question.options" [value]="item.value">{{ item.label || item.value }}</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  `,
  styleUrl: './select-input.component.css'
})
export class SelectInputComponent implements ControlValueAccessor {
  @Input() question!: DomQuestion;

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
