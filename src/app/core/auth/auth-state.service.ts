import { Injectable, signal } from '@angular/core';

export type AuthState =
  | 'unknown'
  | 'authenticated'
  | 'unauthenticated';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {

  private _state = signal<AuthState>('unknown');

  readonly state = this._state.asReadonly();

  setAuthenticated(): void {
    this._state.set('authenticated');
  }

  setUnauthenticated(): void {
    this._state.set('unauthenticated');
  }

  isAuthenticated(): boolean {
    return this._state() === 'authenticated';
  }
}