import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService, Role } from './auth-state.service';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export const permissionGuard: CanActivateFn = (route, state) => {
  const authStateService = inject(AuthStateService);
  const router = inject(Router);

  const requiredRoles = route.data['roles'] as Role[];

  return toObservable(authStateService.state).pipe(
    filter((state) => state !== 'unknown'),
    take(1),
    map((state) => {
      if (
        state === 'authenticated' &&
        authStateService.hasPermission(requiredRoles)
      ) {
        return true;
      }

      return router.createUrlTree(['/']);
    }),
  );
};
