import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Question } from '../models/question';
import { Form } from '../models/form';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getDefaultForms() {
    return this.http.get<Form[]>('assets/data/default-forms.json');
  }
  getDefaultQuestions() {
    return this.http.get<Question[]>('assets/data/default-questions.json');
  }
}
