import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoggedUserModel } from './model/logged-user-model';
import {
  catchError,
  map,
  Observable,
  of,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';
import { LocaleService } from '@core/i18n/locale.service';
import { AuthStateService } from '@core/auth/auth-state.service';
import { UserSummary } from './model/user-summary-model';
import { PageResponse } from '@shared/models/page.response.model';
import { EnumOption } from '@shared/models/EnumOption';
import { UserEnumsResponse } from './model/user-enums-model';
import { CacheDuration, CacheService } from '@core/cache/cache.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl: string = environment.apiUrl;

  private readonly _currentUser = signal<LoggedUserModel | null>(null);

  private userEnums$?: Observable<UserEnumsResponse>;
  private readonly USER_ENUMS_CACHE_KEY = 'user-enums';

  readonly currentUser = this._currentUser.asReadonly();

  constructor(
    private http: HttpClient,
    private localeService: LocaleService,
    private authStateService: AuthStateService,
    private cacheService: CacheService,
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

  getEnums(): Observable<UserEnumsResponse> {
    if (!this.userEnums$) {
      const cached = this.cacheService.get<UserEnumsResponse>(
        this.USER_ENUMS_CACHE_KEY,
      );

      if (cached) {
        this.userEnums$ = of(cached);
      } else {
        this.userEnums$ = this.http
          .get<UserEnumsResponse>(this.apiUrl + '/user/enums')
          .pipe(
            tap((response) => {
              this.cacheService.set(
                this.USER_ENUMS_CACHE_KEY,
                response,
                CacheDuration.LONG,
              );
            }),
            shareReplay(1),
          );
      }
    }

    return this.userEnums$;
  }

  clearCurrentUser() {
    this._currentUser.set(null);
  }
}
