import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    loadComponent: () => import('./pages/home-page.component').then(mod => mod.HomePageComponent)
  },
  {
    title: 'New Form',
    path: 'forms/new',
    loadComponent: () => import('./pages/new-form-page.component').then(mod => mod.NewFormPageComponent)
  },
  {
    title: 'Edit Form',
    path: 'forms/:slug/edit',
    loadComponent: () => import('./pages/edit-form-page.component').then(mod => mod.EditFormPageComponent)
  },
  {
    title: 'Fill Out Form',
    path: 'forms/:slug',
    loadComponent: () => import('./pages/form-page.component').then(mod => mod.FormPageComponent)
  },
];
