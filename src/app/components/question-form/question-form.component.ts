import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Question, initQuestion } from '../../models/question';
import { getSlug, slugValidator } from '../../utilities';
import { QuestionForm, QuestionSubmissionParams } from '../../models/question-form';
import { CommonModule } from '@angular/common';
import { InputErrorPipe } from '../../pipes/input-error.pipe';


@Component({
  selector: 'question-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputErrorPipe],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.css'
})
export class QuestionFormComponent {
  @Input() questions!: Question[]; // we need these to compare slugs to existing slugs :(
  @Output() handleSubmit = new EventEmitter<QuestionSubmissionParams>()
  @Output() onCancel = new EventEmitter<void>()

  @Input()
  public set question(v: Question | null) {
    const value = v ? v : initQuestion();
    this.questionForm.patchValue(value)
    this._question = value;
  }

  public get question(): Question {
    return this._question;
  }

  private _question: Question = initQuestion();

  // TODO validate slug
  // TODO validate tolibary slug
  questionForm: FormGroup<QuestionForm> = this.formBuilder.nonNullable.group({
    label: ['', Validators.required],
    type: ['', Validators.required],
    slug: ['', slugValidator()],
    required: [false],
    library: [false],
    order: [1],
    // options
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.questionForm.patchValue({ order: this.questions.length + 1 });
  }

  onSubmit() {
    try {
      const { label, type, required, library, order } = this.questionForm.value;
      const question = initQuestion({
        label,
        type,
        slug: getSlug(this.questionForm.controls, 'label'),
        required,
        order: order ? order - 1 : 1 // getting possibly undefined except it shouldnt be its non nullable form ?
      });

      if (!question.slug) {
        throw new Error('Provided or calculated slug missing');
      }

      if (this.questions.some(({ slug }) => slug === question.slug)) {
        throw new Error('Slug already exists in form');
      }

      this.handleSubmit.emit({ question, toLibrary: library || false });
    }
    catch (e) {
      alert(e);
    }
  }
}
