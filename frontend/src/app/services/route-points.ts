import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class RoutePointsService {
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  private getToken(): string {
    if (!isPlatformBrowser(this.platformId)) {
      return '';
    }

    const session = JSON.parse(localStorage.getItem('session') || '{}');
    return session.access_token || '';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  createPoint(pointData: {
    route_id: string;
    name: string;
    descricao: string;
    morada: string;
    ordem: number;
  }) {
    return this.http.post(`${environment.apiUrl}/route-points`, pointData, {
      headers: this.getAuthHeaders(),
    });
  }

  deletePoint(id: string) {
    return this.http.delete(`${environment.apiUrl}/route-points/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}