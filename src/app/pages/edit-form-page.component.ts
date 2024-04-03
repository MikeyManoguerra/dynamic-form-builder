import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../layouts/default-layout/default-layout.component';
import { FormsStateService } from '../services/forms-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, catchError, combineLatest, distinctUntilChanged, finalize, map, share, shareReplay, startWith, switchMap, take, takeUntil, tap, throwError, withLatestFrom } from 'rxjs';
import { Form } from '../models/form';
import { CommonModule } from '@angular/common';
import { EditFormComponent } from '../components/edit-form/edit-form.component';

@Component({
  selector: 'edit-form-page',
  standalone: true,
  imports: [CommonModule, DefaultLayoutComponent, EditFormComponent],
  template: `
    <default-layout>
      <edit-form [form$]="form$" (fetchForm)="fetchForm$.next()"></edit-form>
  </default-layout>`,
  // styleUrl: ''
})
export class EditFormPageComponent {
  constructor(
    private formsStateService: FormsStateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  form$!: Observable<Form>;
  fetchForm$ = new Subject<void>()


  ngOnInit() {
    // TODO need to sort the questions by order somewhere
    this.form$ = combineLatest([this.route.params, this.fetchForm$.pipe(startWith(null))]).pipe(
      switchMap(([{ slug }]) => this.formsStateService.getForm(slug).pipe(
        take(1), // we do not want the inner observable to respond to subsequent changes in state,
        // finalize(() => { console.log('final'); })
      )),
      catchError(error => {
        console.log('i am erroring');

        // todo 404
        this.router.navigate(['/']);
        return throwError(() => new Error(error));
      }),
    );
  }
}



  // ngOnInit() {
  //   const kill$ = new Subject<void>()
  //   this.form$ = this.route.params.pipe(
  //     switchMap(({ slug }) => this.formsStateService.getForm(slug).pipe(takeUntil(kill$))),
  //     catchError(error => {
  //       console.log('i am erroring');

  //       // todo 404
  //       this.router.navigate(['/']);
  //       return throwError(() => new Error(error));
  //     }),
  //     tap(() => {
  //       kill$.next()
  //       kill$.complete()
  //      })
  //   )
  // }
