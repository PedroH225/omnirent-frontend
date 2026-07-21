import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel, TokenResponse } from '../../features/users/models/auth.model';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(authModel: AuthModel): Observable<TokenResponse> {
    localStorage.removeItem("token");
    return this.http.post<TokenResponse>(
      `${this.apiUrl}/auth/login`, authModel
    )
    .pipe(
      tap(response => localStorage.setItem("token", response.token))
    );
  }
}