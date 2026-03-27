import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';

export interface CreateRouteResponse {
  message: string;
  route: any;
}

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  constructor(private http: HttpClient) {}

  getRoutes() {
    return this.http.get(`${environment.apiUrl}/routes`);
  }

  getRouteById(id: string) {
    return this.http.get(`${environment.apiUrl}/routes/${id}`);
  }

  createRoute(routeData: {
    titulo: string;
    descricao: string;
    duracao: string;
    dificuldade: string;
    cidade: string;
    categoria: string;
  }) {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    const token = session.access_token;

    return this.http.post<CreateRouteResponse>(
      `${environment.apiUrl}/routes`,
      routeData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}