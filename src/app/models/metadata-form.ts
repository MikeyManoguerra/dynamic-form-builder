import { FormControl } from "@angular/forms";
import { toSlug } from "../utilities";

export interface MetadataForm extends Record<string, FormControl<any>> {
  slug: FormControl<string | null>;
  title: FormControl<string | null>;
}

