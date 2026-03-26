 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';

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
}