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
        },

        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617'
                },

                text: {
                    color: '#1e293b',
                    mutedColor: '#64748b'
                }
            },

            dark: {
                surface: {
                    0: '#0f172a',
                    50: '#111827',
                    100: '#1e293b',
                    200: '#334155',
                    300: '#475569',
                    400: '#64748b',
                    500: '#94a3b8',
                    600: '#cbd5e1',
                    700: '#e2e8f0',
                    800: '#f1f5f9',
                    900: '#f8fafc',
                    950: '#ffffff'
                },

                text: {
                    color: '#f8fafc',
                    mutedColor: '#94a3b8'
                }
            }
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
