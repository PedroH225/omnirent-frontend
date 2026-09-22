import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiException } from '../../shared/models/api-exception';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { TranslationService } from '@core/i18n/translation.service';
import { MessageService } from 'primeng/api';

const unavailableStatuses = [502, 503, 504, 522];

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const translationService = inject(TranslationService);
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const apiError = error.error as ApiException;

      if (error.status === 0 || unavailableStatuses.includes(error.status)) {
        messageService.clear();

        messageService.add({
          severity: 'error',
          summary: translationService.translate(
            'error.serverUnavailable.title',
          ),
          detail: translationService.translate(
            'error.serverUnavailable.detail',
          ),
        });

        return throwError(() => error);
      }

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
            detail: apiError.message,
          });

          break;
        default:
          break;
      }
      return throwError(() => error);
    }),
  );
};
