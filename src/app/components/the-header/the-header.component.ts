import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'the-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  viewProviders: [],
  template: `
    <header>
      <div class="header-inner">
        <nav>
          <ul>
            <li><a routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" routerLink="/" class="underline hover:no-underline">Home</a></li>
            <li><a routerLinkActive="active" routerLink="/forms/new" class="underline hover:no-underline">
              <span>New Form</span>
            </a></li>
          </ul>
        </nav>
        <div class="controls">
          <div>
          </div>
          <div class="flex gap-2">
            <button
              (click)="onReset.emit()"
              class="underline hover:no-underline"
            >Reset</button>
            <span>|</span>
            <a
              href="https://github.com/mikeymanoguerra/dynamic-form-builder"
              class="underline hover:no-underline"
            >Github</a>
          </div>
        </div>
      </div>
    </header>
  `,
  styleUrl: './the-header.component.css'
})
export class TheHeaderComponent {
  @Output() onReset = new EventEmitter();
}
