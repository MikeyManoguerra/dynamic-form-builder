import { FormControl } from "@angular/forms";
import { Question } from "./question";

export interface QuestionForm extends Record<string, FormControl<any>>  {
  label: FormControl<string>;
  type: FormControl<string>;
  slug: FormControl<string>;
  required: FormControl<boolean>;
  library: FormControl<boolean>;
  order: FormControl<number>;
}

export interface QuestionSubmissionParams {
  question: Question;
  toLibrary: boolean;
}
