import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, take } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AuthStateService } from './auth-state.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthStateService);
  const router = inject(Router);

  return toObservable(authService.state).pipe(
    filter((state) => state !== 'unknown'),
    take(1),
    map((state) => {
      if (state === 'authenticated') {
        return true;
      }

      return router.createUrlTree(['/auth/login']);
    })
  );
};