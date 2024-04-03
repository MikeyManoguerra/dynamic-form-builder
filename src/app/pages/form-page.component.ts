import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { DefaultLayoutComponent } from '../layouts/default-layout/default-layout.component';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
import { FormsStateService } from '../services/forms-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { Form } from '../models/form';


@Component({
  selector: 'form-page',
  standalone: true,
  imports: [CommonModule, DefaultLayoutComponent, DynamicFormComponent],
  template: `
    <default-layout>
      <ng-container *ngIf="form$ | async as form">
        <dynamic-form [form]="form"></dynamic-form>
      </ng-container>
  </default-layout>`,
  // styleUrl: ''
})
export class FormPageComponent {

  constructor(
    private formsStateService: FormsStateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  form$!: Observable<Form>;

  ngOnInit() {
    this.form$ = this.route.params.pipe(
      switchMap(({ slug }) => this.formsStateService.getForm(slug)),
      catchError(error => {
        // todo 404
        this.router.navigate(['/']);
        return throwError(() => new Error(error));
      })
    )
  }
}
