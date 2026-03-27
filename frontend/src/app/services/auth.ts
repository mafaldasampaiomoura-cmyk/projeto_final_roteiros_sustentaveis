import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';

export interface LoginResponse {
  message: string, 
  session: any, 
  user: any;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, {
      email,
      password,
    });
  }

  getMe() {
  const session = JSON.parse(localStorage.getItem('session') || '{}');
  const token = session.access_token;

    return this.http.get(`${environment.apiUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

