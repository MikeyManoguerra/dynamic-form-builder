import { Type } from "@angular/core";
import { TextInputComponent } from "../components/inputs/text-input/text-input.component";
import { TextAreaInputComponent } from "../components/inputs/text-area-input/text-area-input.component";
import { SelectInputComponent } from "../components/inputs/select-input/select-input.component";
import { OrderedPipe } from "../pipes/ordered.pipe";

export interface Question {
  label: string;
  type: string; //TODO define as enum
  slug: string;
  required: boolean;
  order: number; // zero indexed
  options?: { slug: string, value: string, label?: string }[];
}
// TODO help text

// TODO take partial
export function initQuestion(question: Partial<Question> = {}) {
  const { label, type, slug, required, order, options } = question;

  return {
    label: label || '',
    type: type || '', //TODO define as enum
    slug: slug || '',
    required: required || false,
    order: order ?? 1,
    options: options?.length ? options : [],
  }
}

export type DomQuestion = Pick<Question, 'label' | 'type' | 'slug' | 'required'> & Partial<Question>
// TODO selectdomquestion?


export function getInputComponent(type: string) {
  const componentMap: { [key: string]: Type<any> } = {
    'text': TextInputComponent,
    'text-area': TextAreaInputComponent,
    'select': SelectInputComponent,
  }

  return componentMap[type];
}


export function reorderQuestions(questions: Question[], newQuestion?: Question) {
  const orderedQuestions = new OrderedPipe().transform(questions); // likely redundant

  if(!newQuestion) return orderedQuestions.map((question, order) => ({ ...question, order }));

  const { order: newQuestionPosition } = newQuestion;

  return [
    ...orderedQuestions.slice(0, newQuestionPosition),
    newQuestion,
    ...orderedQuestions.slice(newQuestionPosition),
  ].map((question, order) => ({ ...question, order }));
}
