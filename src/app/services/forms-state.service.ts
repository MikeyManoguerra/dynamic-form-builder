import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take, tap } from 'rxjs';
import { Form } from '../models/form';
import { DataService } from './data.service';
import { Question } from '../models/question';
import { LocalStorageService } from './local-storage.service';

// app state for all available forms
@Injectable({
  providedIn: 'root'
})
export class FormsStateService {

  // Note strategy for local storage is to keep local storage synced to FormStateService.
  // FormStateService is the source of truth once the app is init

  constructor(
    private dataService: DataService,
    private localStorageService: LocalStorageService,
  ) { }

  private readonly _forms$ = new BehaviorSubject<Form[]>([]);
  readonly forms$ = this._forms$.asObservable()
  private readonly _questions$ = new BehaviorSubject<Question[]>([]);
  readonly questions$ = this._questions$.asObservable()

  reset() {
    this.localStorageService.clear();
    this._forms$.next([]);
    this._questions$.next([]);
    this.init();
  }

  init() {
    const storedForms = this.localStorageService.getForms();
    const storedQuestions = this.localStorageService.getQuestions();

    if (storedForms.length) {
      storedForms.forEach(form => this.addForm(form))
    }
    else {
      this.dataService.getDefaultForms().pipe(
        take(1)
      ).subscribe(forms => forms.forEach(form => this.addForm(form)));
    }

    if (storedQuestions.length) {
      storedQuestions.forEach(question => this.addQuestion(question));
    }
    else {
      this.dataService.getDefaultQuestions().pipe(
        take(1)
      ).subscribe(questions => questions.forEach(question => this.addQuestion(question)));
    }
  }

  addForm(form: Form) {
    this._forms$.next([...this._forms$.value, form]);
    this.localStorageService.setForms(this._forms$.value)
    // return this.getForm(form.slug);
  }

  updateForm(formSlug: string, formData: Form) {
    // use old slug to find old version of form do a full replace
    this._forms$.next([...this._forms$.value.filter(({ slug }) => slug !== formSlug), formData]);
    this.localStorageService.setForms(this._forms$.value)
  }


  addQuestion(question: Question) {
    this._questions$.next([...this._questions$.value, question]);
    this.localStorageService.setQuestions(this._questions$.value)
  }

  getQuestion(questionSlug: string) {
    return this.questions$.pipe(
      map(questions => {
        const question = questions.find(({ slug }) => slug === questionSlug);
        if (!question) throw new Error("404");
        return question;
      }),
    );
  }

  getForm(selectedFormSlug: string) {
    return this.forms$.pipe(
      map(forms => {
        const form = forms.find(({ slug }) => slug === selectedFormSlug);
        if (!form) throw new Error("404");
        return form;
      }),
    );
  }

  slugInUse(FormSlug: string, config?: { ignore?: string }) {
    const ignore = config?.ignore; // be able to ignore a slug when searching for dupes
    return this.forms$.pipe(
      map(forms => forms.filter(({ slug }) => slug !== ignore).some(({ slug }) => slug === FormSlug))
    );
  }
}
