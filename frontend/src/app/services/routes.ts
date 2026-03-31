import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  constructor(private http: HttpClient) {}

  private getToken(): string {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    return session.access_token || '';
  }

  private getAuthHeaders() {
    return {
      Authorization: `Bearer ${this.getToken()}`,
    };
  }

  getRoutes() {
    return this.http.get(`${environment.apiUrl}/routes`, {
      headers: this.getAuthHeaders(),
    });
  }

  getRouteById(id: string) {
    return this.http.get(`${environment.apiUrl}/routes/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createRoute(routeData: {
    titulo: string;
    descricao: string;
    duracao: string;
    dificuldade: string;
    cidade: string;
    categoria: string;
  }) {
    return this.http.post(`${environment.apiUrl}/routes`, routeData, {
      headers: this.getAuthHeaders(),
    });
  }

  updateRoute(
    id: string,
    routeData: {
      titulo: string;
      descricao: string;
      duracao: string;
      dificuldade: string;
      cidade: string;
      categoria: string;
    }
  ) {
    return this.http.put(`${environment.apiUrl}/routes/${id}`, routeData, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteRoute(id: string) {
    return this.http.delete(`${environment.apiUrl}/routes/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}