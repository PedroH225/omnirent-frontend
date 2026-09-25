import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiException } from '../../shared/models/api-exception';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { TranslationService } from '@core/i18n/translation.service';
import { MessageService } from 'primeng/api';

const unavailableStatuses = [0, 502, 503, 504, 522];
let lastServerErrorAt = 0;

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const translationService = inject(TranslationService);
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
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
  clearMessages(messageService);
  switch (apiError.errorCode) {
    case 'FORBIDDEN':
      if (router.url.startsWith('/admin')) {
        router.navigate(['/']);
      }
      break;

    case 'RATE_LIMIT_EXCEEDED':
      clearMessages(messageService);
      messageService.add({
        key: 'error',
        severity: 'warn',
        summary: translationService.translate('error.tooManyRequests.title'),
        detail: apiError.message,
      });
      break;
    case 'INTERNAL_SERVER_ERROR':
      showMessage(
        'error',
        'error.internalServer.title',
        'error.internalServer.detail',
        messageService,
        translationService,
      );
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
  const now = Date.now();
  if (now - lastServerErrorAt < 10000) {
    return;
  }
  lastServerErrorAt = now;

  if (unavailableStatuses.includes(error.status)) {
    showMessage(
      'error',
      'error.serverUnavailable.title',
      'error.serverUnavailable.detail',
      messageService,
      translationService,
    );
  }
  if (error.status === 500) {
    showMessage(
      'error',
      'error.internalServer.title',
      'error.internalServer.detail',
      messageService,
      translationService,
    );
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

function showMessage(
  severity: 'success' | 'info' | 'warn' | 'error',
  titleKey: string,
  detailKey: string,
  messageService: MessageService,
  translationService: TranslationService,
): void {
  clearMessages(messageService);

  messageService.add({
    key: 'error',
    severity,
    summary: translationService.translate(titleKey),
    detail: translationService.translate(detailKey),
  });
}

function clearMessages(messageService: MessageService) {
  messageService.clear('error')
}
