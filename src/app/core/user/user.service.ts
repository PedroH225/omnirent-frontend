import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoggedUserModel } from './model/logged-user-model';
import { Observable } from 'rxjs';
import { LocaleService } from '@core/i18n/locale.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl: string = environment.apiUrl;

  private readonly _currentUser = signal<LoggedUserModel | null>(null);

  readonly currentUser = this._currentUser.asReadonly();

  constructor(private http: HttpClient, private localeService: LocaleService) { }

  loadLoggedUserData(): void {
    this.http.get<LoggedUserModel>(`${this.apiUrl}/user/me`).subscribe({
      next: (user) => {
        this._currentUser.set(user);
        this.localeService.setLocale(user.locale);
      },
      error: (error) => {
        this.clearCurrentUser();
        console.error(error);
      }
    });
  }

  clearCurrentUser() {
    this._currentUser.set(null);
  }
}
