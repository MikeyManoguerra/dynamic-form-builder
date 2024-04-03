import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Form } from '../../models/form';
import { DynamicInputDirective } from '../../directives/dynamic-input.directive';
import { CommonModule } from '@angular/common';
import { slugValidator } from '../../utilities';
import { Observable } from 'rxjs';
import { MetadataForm } from '../../models/metadata-form';



@Component({
  selector: 'form-metadata-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DynamicInputDirective,],
  templateUrl: './form-metadata-form.component.html',
  styleUrl: './form-metadata-form.component.css'
})
export class FormMetadataFormComponent {
  @Input() form$!: Observable<Form>;
  @Input() isNew!: boolean;
  @Output() handleSubmit = new EventEmitter<{form: MetadataForm, originalSlug: string}>();

  @Input()
  set disabled(value: boolean) {
    this.setFormAvailability(value);
  };

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  slugQuestion = {
    slug: 'slug',
    label: 'Slug',
    required: false,
    type: 'text'
  }

  titleQuestion = {
    slug: 'title',
    label: 'Title',
    required: true,
    type: 'text'
  }

  // initializing empty so we can disable in input setter
  domForm: FormGroup<MetadataForm> = this.formBuilder.group({
    slug: ['', slugValidator()],
    title: ['', Validators.required]
  });

  originalSlug!: string

  ngOnInit() {
    this.form$.pipe().subscribe(({ slug, title }) => {
      this.domForm.patchValue({ slug, title });
      this.originalSlug = slug;
    })
  }

  onSubmit() {
    this.handleSubmit.emit({form: this.domForm.controls, originalSlug: this.originalSlug})
  }

  setFormAvailability(disabled: boolean) {
    disabled ? this.domForm.disable() : this.domForm.enable();
  }
}
