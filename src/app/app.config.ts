import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(), // required animations providers for Toastr
    provideToastr({
      timeOut: 1200,
      maxOpened: 1,
      toastClass: 'ngx-toastr dynamic-form-builder-notify',
      iconClasses: {
        error: '',
        info: '',
        success: '',
        warning: '',
      },
      positionClass: 'toast-bottom-right',
      // autoDismiss: true,
    }),
  ],
};
