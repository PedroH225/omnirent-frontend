import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { AuthModel } from '../../features/auth/models/auth.model';
import { environment } from '../../../environments/environment';
import { Observable, ReplaySubject, switchMap, tap } from 'rxjs';

import { UserService } from '@core/user/user.service';
import { RegisterDto } from '@features/auth/models/register-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string = environment.apiUrl;

  private authInitialized$ = new ReplaySubject<void>(1);

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {}

  registerUser(register: RegisterDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/register`, register);
  }

  login(authModel: AuthModel): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/auth/login`, authModel)
      .pipe(switchMap(() => this.userService.loadLoggedUserData()));
  }

  logout(): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/auth/logout`, null).pipe(
      tap(() => {
        this.userService.clearCurrentUser();
      }),
    );
  }
}
