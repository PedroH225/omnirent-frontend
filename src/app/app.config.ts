import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { authInterceptor } from './core/auth/auth.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/http/error-interceptor';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { definePreset } from '@primeng/themes';

const OmniRentTheme = definePreset(Lara, {
    semantic: {
        primary: {
            50: '#eef7ff',
            100: '#d9edff',
            200: '#bce0ff',
            300: '#8dcbff',
            400: '#58afff',
            500: '#2f80ed',
            600: '#2369d6',
            700: '#1d56b3',
            800: '#1b4892',
            900: '#1a3d77',
            950: '#11284f'
        }
    }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: OmniRentTheme,
        options: {
          darkModeSelector: false
        }
      }
    }),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        authInterceptor, 
        errorInterceptor
      ])
    )
  ]
};
