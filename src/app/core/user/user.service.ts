import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoggedUserModel } from './model/logged-user-model';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { LocaleService } from '@core/i18n/locale.service';
import { AuthStateService } from '@core/auth/auth-state.service';
import { UserSummary } from './model/user-summary-model';
import { PageResponse } from '@shared/models/page.response.model';

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

  searchUsers(
    username?: string,
    status?: string,
    page = 0,
    size = 10,
  ): Observable<PageResponse<UserSummary>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (username) {
      params = params.set('username', username);
    }

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<PageResponse<UserSummary>>(
      `${this.apiUrl}/admin/users`,
      { params },
    );
  }

  clearCurrentUser() {
    this._currentUser.set(null);
  }
}
