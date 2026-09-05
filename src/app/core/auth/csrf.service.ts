import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

export interface CsrfResponse {
  headerName: string;
  parameterName: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class CsrfService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  loadToken(): Observable<void> {
    return this.http.get(`${this.apiUrl}/auth/csrf`).pipe(map(() => void 0));
  }
}
