import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private http: HttpClient) {}

  private getToken(): string {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    return session.access_token || '';
  }

  getFavorites() {
    return this.http.get(`${environment.apiUrl}/favourites`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  addFavorite(routeId: string) {
    return this.http.post(
      `${environment.apiUrl}/favourites`,
      { route_id: routeId },
      {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      }
    );
  }

  removeFavorite(routeId: string) {
    return this.http.delete(`${environment.apiUrl}/favourites/${routeId}`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }
}