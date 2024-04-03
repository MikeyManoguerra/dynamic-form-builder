import { Component } from '@angular/core';
import { initForm } from '../models/form';
import { DefaultLayoutComponent } from '../layouts/default-layout/default-layout.component';
import { FormMetadataFormComponent } from '../components/form-metadata-form/form-metadata-form.component';
import { filter, of, take, tap } from 'rxjs';
import { MetadataForm } from '../models/metadata-form';
import { FormsStateService } from '../services/forms-state.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { getSlug } from '../utilities';

@Component({
  selector: 'new-form-page',
  standalone: true,
  imports: [DefaultLayoutComponent, FormMetadataFormComponent],
  template: `
    <default-layout>
      <form-metadata-form [isNew]="true" [form$]="form$" (handleSubmit)="handleSubmit($event)"></form-metadata-form>
    </default-layout>
  `
})
export class NewFormPageComponent {
  form$ = of(initForm())

  constructor(
    private formsStateService: FormsStateService,
    private toast: ToastService,
    private router: Router
  ) { }

  handleSubmit({ form }: { form: MetadataForm }) {
    const slug = getSlug(form, 'title');
    const title = form.title.value as string;
    this.formsStateService.slugInUse(slug).pipe(
      take(1), // this needs to be high up to avoid a circular dependency loop
      tap(slugInUse => (slugInUse) && this.toast.notify('Slug already in use!')),
      filter(slugInUse => !slugInUse),
      tap(() => {
        this.formsStateService.addForm({ slug, title, questions: [] });
        this.router.navigate(['/forms', slug, 'edit']);
      })
    ).subscribe();
  }
}
