import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoggedUserModel } from './model/logged-user-model';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { LocaleService } from '@core/i18n/locale.service';
import { AuthStateService } from '@core/auth/auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl: string = environment.apiUrl;

  private readonly _currentUser = signal<LoggedUserModel | null>(null);

  readonly currentUser = this._currentUser.asReadonly();

  constructor(
    private http: HttpClient,
    private localeService: LocaleService,
    private authStateService: AuthStateService,
  ) {}

  loadLoggedUserData(): Observable<void> {
    return this.http.get<LoggedUserModel>(`${this.apiUrl}/user/me`).pipe(
      tap((user) => {
        this._currentUser.set(user);
        this.localeService.setLocale(user.locale);
        this.authStateService.setAuthenticated();
        this.authStateService.setPermissions(user.authorities);
      }),
      map(() => void 0),
      catchError((error) => {
        this.clearCurrentUser();
        this.authStateService.setUnauthenticated();

        return throwError(() => error);
      }),
    );
  }

  clearCurrentUser() {
    this._currentUser.set(null);
  }
}
