import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserPreferences } from './model/user-preferences-model';

@Injectable({
  providedIn: 'root',
})
export class UserPreferencesService {
  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  savePreferences(preferences: UserPreferences): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/user/changePreferences`, preferences);
  }
}
