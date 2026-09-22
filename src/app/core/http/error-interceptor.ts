import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiException } from '../../shared/models/api-exception';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { TranslationService } from '@core/i18n/translation.service';
import { MessageService } from 'primeng/api';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const translationService = inject(TranslationService);
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const apiError = error.error as ApiException;
      switch (apiError.errorCode) {
        case 'FORBIDDEN':
          if (router.url.startsWith('/admin')) {
            router.navigate(['/']);
          }
          break;

        case 'RATE_LIMIT_EXCEEDED':
          messageService.clear();

          messageService.add({
            severity: 'warn',
            summary: translationService.translate(
              'error.tooManyRequests.title',
            ),
            detail: apiError.message
          });

          break;
        default:
          break;
      }
      return throwError(() => error);
    }),
  );
};
