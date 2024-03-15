import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component').then(mod => mod.HomePageComponent)
  },
  {
    title: 'First',
    path: 'first',
    loadComponent: () => import('./pages/first-page/first-page.component').then(mod => mod.FirstPageComponent)
  },
];
