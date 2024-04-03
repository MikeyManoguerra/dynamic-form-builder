import { Injectable } from '@angular/core';
import { Form } from '../models/form';
import { Question } from '../models/question';

// TODO if this gets unwieldy, make get and set dynamic.
// setItems<T>(key: string, items: T[]): T[] { // }

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setForms(forms: Form[]) {
    window.localStorage.setItem('forms', JSON.stringify(forms));
  }

  getForms(): Form[] {
    const forms = window.localStorage.getItem('forms');
    if (!forms) return [];

    return JSON.parse(forms);
  }

  getQuestions(): Question[] {
    const questions = window.localStorage.getItem('questions');
    if (!questions) return [];

    return JSON.parse(questions);
  }

  setQuestions(questions: Question[]) {
    window.localStorage.setItem('questions', JSON.stringify(questions));
  }

  clear() {
    window.localStorage.clear();
  }
}
