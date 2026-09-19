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
import { UserEnumsResponse } from './model/user-enums-model';
import { CacheDuration, CacheService } from '@core/cache/cache.service';
import { UserDetail } from './model/user-detail-model';
import { UpdateUserRequest } from './model/update-user-model';

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

  updateUser(updateRequest: UpdateUserRequest): Observable<UserDetail> {
    return this.http.put<UserDetail>(
      `${this.apiUrl}/user/update`,
      updateRequest,
    );
  }

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

        return throwError(() => error);
      }),
    );
  }

  findById(): Observable<UserDetail> {
    return this.http.get<UserDetail>(`${this.apiUrl}/user/find`);
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

  toggleUserBan(userId: string): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/admin/users/status/${userId}`,
      {},
    );
  }

  toggleActivatedStatus(): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/user/changeStatus`, {});
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
    const userId = this.currentUser()?.id;

    if (userId) {
      this.cacheService.clearByUserId(userId);
    }
    this._currentUser.set(null);
    this.authStateService.setUnauthenticated();
  }
}
