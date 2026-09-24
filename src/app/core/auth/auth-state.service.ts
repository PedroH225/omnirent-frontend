import { Injectable, signal } from '@angular/core';

export type AuthState = 'unknown' | 'authenticated' | 'unauthenticated';
export enum Role {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
}

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private _state = signal<AuthState>('unknown');
  private _roles: Role[] = [];

  readonly state = this._state.asReadonly();

  private readonly _initialized = signal(false);

  readonly initialized = this._initialized.asReadonly();

  setInitialized(): void {
    this._initialized.set(true);
  }

  setAuthenticated(): void {
    this._state.set('authenticated');
  }

  setPermissions(authorities: string[]) {
    this._roles = authorities.filter((authority): authority is Role =>
      Object.values(Role).includes(authority as Role),
    );
  }

  setUnauthenticated(): void {
    this._state.set('unauthenticated');
    this.setPermissions([]);
  }

  isAuthenticated(): boolean {
    return this._state() === 'authenticated';
  }

  hasPermission(requiredRoles: Role[]): boolean {
    return requiredRoles.some((role) => this._roles.includes(role));
  }
}
