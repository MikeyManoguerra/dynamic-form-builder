import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../layouts/default-layout/default-layout.component';



@Component({
  selector: 'first-page',
  standalone: true,
  imports: [DefaultLayoutComponent,],
  template: `
    <default-layout>
    </default-layout>
  `,
  styles: ``
})
export class FirstPageComponent { }
