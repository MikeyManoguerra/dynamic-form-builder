import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octMarkGithub } from '@ng-icons/octicons'

@Component({
  selector: 'the-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIconComponent],
  viewProviders: [provideIcons({ octMarkGithub })],
  template: `
    <header>
      <div class="header-inner">
        <nav>
          <ul>
            <li><a routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" routerLink="/">Home</a></li>
            <li><a routerLinkActive="active" routerLink="/first">
              <span>One</span>
              <span>First</span>
            </a></li>
          </ul>
        </nav>
        <div class="controls">
          <div>
          </div>
          <div>|</div>
        </div>
      </div>
    </header>
  `,
  styleUrl: './the-header.component.css'
})
export class TheHeaderComponent {

}
