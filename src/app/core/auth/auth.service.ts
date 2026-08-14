import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel, TokenResponse } from '../../features/auth/models/auth.model';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from '../../features/auth/models/jwt.payload';
import { UserService } from '@core/user/user.service';
import { RegisterDto } from '@features/auth/models/register-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private userService: UserService) { }

  registerUser(register: RegisterDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/register`, register);
  }

  login(authModel: AuthModel): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(
      `${this.apiUrl}/auth/login`, authModel
    )
      .pipe(
        tap(response => {
          localStorage.setItem("token", response.token);
          this.userService.loadLoggedUserData();
        }
        )
      );
  }

  logout(): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/auth/logout`, null)
      .pipe(
        tap(() => {
          localStorage.removeItem("token");
          this.userService.clearCurrentUser();
        }
        )
      );
  }

  getJwtPayload(token: string): JwtPayload {
    return jwtDecode<JwtPayload>(token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    try {
      const payload = this.getJwtPayload(token);
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}