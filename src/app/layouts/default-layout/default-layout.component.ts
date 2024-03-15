import { Component } from '@angular/core';

@Component({
  selector: 'default-layout',
  standalone: true,
  imports: [],
  template: `
    <div class="layout">
      <div class="layout-inner">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: './default-layout.component.css'
})
export class DefaultLayoutComponent { }
