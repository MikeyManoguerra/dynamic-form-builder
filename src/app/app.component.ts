import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TheHeaderComponent } from './components/the-header/the-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    TheHeaderComponent
  ],
  template: `
    <the-header />
    <main class="main">
      <router-outlet />
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent { }
