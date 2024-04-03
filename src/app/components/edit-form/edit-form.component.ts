import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Form } from '../../models/form';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormMetadataFormComponent } from '../form-metadata-form/form-metadata-form.component';
import { Router, RouterModule } from '@angular/router';
import { Observable, Subject, filter, map, take, tap, withLatestFrom } from 'rxjs';
import { MetadataForm } from '../../models/metadata-form';
import { FormsStateService } from '../../services/forms-state.service';
import { ToastService } from '../../services/toast.service';
import { QuestionFormComponent } from '../question-form/question-form.component';
import { Question, reorderQuestions } from '../../models/question';
import { QuestionSubmissionParams } from '../../models/question-form';
import { OrderedPipe } from '../../pipes/ordered.pipe';
import { getSlug } from '../../utilities';

@Component({
  selector: 'edit-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormMetadataFormComponent,
    RouterModule,
    QuestionFormComponent,
    OrderedPipe,
  ],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})
export class EditFormComponent {
  @Input() form$!: Observable<Form>;
  @Output() fetchForm = new EventEmitter();

  metadataFormDisabled = true;
  newQuestionFlow = false
  // newQuestionFlow = true
  questionLibrary$!: Observable<Question[]>;
  currentQuestion$ = new Subject<Question>();
  librarySelectControl = new FormControl('');

  constructor(
    private formsStateService: FormsStateService,
    private toast: ToastService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.questionLibrary$ = this.formsStateService.questions$;
  }

  toggleMetadataFormDisabled() {
    this.metadataFormDisabled = !this.metadataFormDisabled;
    if (this.metadataFormDisabled) this.fetchForm.emit(); // refresh form from state
  }

  injectLibaryQuestion() {
    // todo handle error
    if (!this.librarySelectControl.value) return;
    this.formsStateService.getQuestion(this.librarySelectControl.value).pipe(
      withLatestFrom(this.form$),
      take(1)
    ).subscribe(([question, form]) => {
      // set with appropriate order. Note: without spread, add from library will not reset values
      this.currentQuestion$.next({ ...question, order: form.questions.length + 1 });
    })
  }

  editQuestion(question: Question) {
    // TODO
    // hidden value in form to denote new vs edit
    // set currentQuestion$ question
    // account for hidden value in handleQuestionSubmit
  }

  removeQuestion({ slug }: Question) {
    const remove = confirm('Are you sure you want to remove this question?');
    if (!remove) return;

    this.form$.pipe(
      map(form => {
        form.questions = reorderQuestions(form.questions.filter(question => slug !== question.slug));
        return form;
      }),
      take(1)
    ).subscribe(form => {
      this.formsStateService.updateForm(form.slug, form);
    });
  }

  handleMetaDataSubmit({ form, originalSlug }: { form: MetadataForm, originalSlug: string }) {
    const slug = getSlug(form, 'title');
    const title = form.title.value as string;
    this.formsStateService.slugInUse(slug, { ignore: originalSlug }).pipe(
      take(1), // this needs to be high up to avoid a circular dependency loop
      withLatestFrom(this.form$),
      tap(([slugInUse]) => (slugInUse) && this.toast.notify('Slug already in use!')),
      filter(([slugInUse]) => !slugInUse),
      map(([_, form]) => form),
      tap(({ questions }) => {
        this.formsStateService.updateForm(originalSlug, { slug, title, questions });
        this.metadataFormDisabled = true;
        this.router.navigate(['/forms', slug, 'edit']);
      })
    ).subscribe();
  }

  handleQuestionSubmit({ question, toLibrary }: QuestionSubmissionParams) {
    if (toLibrary) this.formsStateService.addQuestion(question);
    this.librarySelectControl.patchValue('');

    this.form$.pipe(
      map(form => {
        const questions = form.questions.filter(({ slug }) => slug !== question.slug);
        form.questions = reorderQuestions(questions, question);
        return form;
      }),
      take(1)
    ).subscribe(form => {
      this.formsStateService.updateForm(form.slug, form);
      this.newQuestionFlow = false;
    })
  }
}
