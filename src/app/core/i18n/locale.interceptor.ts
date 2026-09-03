import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LocaleService } from "@core/i18n/locale.service";

export const localeInterceptor: HttpInterceptorFn = (req, next) => {
  const localeService = inject(LocaleService);

  return next(
    req.clone({
      setHeaders: {
        "Accept-Language": localeService.locale()
      }
    })
  );
};