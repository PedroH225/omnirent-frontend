import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiException } from '../../shared/models/api-exception';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { TranslationService } from '@core/i18n/translation.service';
import { MessageService } from 'primeng/api';

const unavailableStatuses = [0, 502, 503, 504, 522];

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const translationService = inject(TranslationService);
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      messageService.clear();

      if (isApiException(error.error)) {
        handleApiError(error.error, router, messageService, translationService);
      } else {
        handleStatus(error, messageService, translationService);
      }

      return throwError(() => error);
    }),
  );
};

function handleApiError(
  apiError: ApiException,
  router: Router,
  messageService: MessageService,
  translationService: TranslationService,
): void {
  switch (apiError.errorCode) {
    case 'FORBIDDEN':
      if (router.url.startsWith('/admin')) {
        router.navigate(['/']);
      }
      break;

    case 'RATE_LIMIT_EXCEEDED':
      messageService.add({
        severity: 'warn',
        summary: translationService.translate('error.tooManyRequests.title'),
        detail: apiError.message,
      });
      break;

    default:
      break;
  }
}

function handleStatus(
  error: HttpErrorResponse,
  messageService: MessageService,
  translationService: TranslationService,
): void {
  if (unavailableStatuses.includes(error.status)) {
    messageService.add({
      severity: 'error',
      summary: translationService.translate('error.serverUnavailable.title'),
      detail: translationService.translate('error.serverUnavailable.detail'),
    });
  }
}

function isApiException(error: unknown): error is ApiException {
  return (
    typeof error === 'object' &&
    error !== null &&
    'errorCode' in error &&
    'message' in error
  );
}
