import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TheHeaderComponent } from './components/the-header/the-header.component';
import { FormsStateService } from './services/forms-state.service';
import { Observable } from 'rxjs';
import { Form } from './models/form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    TheHeaderComponent
  ],
  template: `
    <the-header (onReset)="reset()"/>
    <main *ngIf="(forms$ | async)?.length" class="main">
      <router-outlet />
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private formStateService: FormsStateService) { }

  forms$!: Observable<Form[]>;
  ngOnInit() {
    this.formStateService.init();
    this.forms$ = this.formStateService.forms$; // this is temp, todo Resolver i guess
  }
  reset() {
    const reset = confirm('Are you sure you want to reset the app? It will remove any forms or questions you have created and reset any edits.')

    if (reset) this.formStateService.reset();
  }
}
