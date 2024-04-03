import { Question } from "./question";

export interface Form {
  questions: Question[];
  slug: string;
  title: string;
}

export function initForm() {
  return {
    questions: [],
    slug: '',
    title: '',
  } as Form;
}
