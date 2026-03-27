import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';
import { Router } from '@angular/router';
import { RoutesService, CreateRouteResponse } from '../../services/routes';

@Component({
  selector: 'app-create-route',
  imports: [FormsModule, Navbar],
  templateUrl: './create-route.html',
  styleUrl: './create-route.css',
})
export class CreateRoute {
  titulo = '';
  descricao = '';
  cidade = '';
  duracao = '';
  dificuldade = '';
  categoria = '';

  constructor(
    private routesService: RoutesService,
    private router: Router
  ) {}

  onSubmit() {
    this.routesService.createRoute({
      titulo: this.titulo,
      descricao: this.descricao,
      cidade: this.cidade,
      duracao: this.duracao,
      dificuldade: this.dificuldade,
      categoria: this.categoria,
    }).subscribe({
      next: (response: CreateRouteResponse) => {
        console.log('ROTEIRO CRIADO:', response);
        this.router.navigate(['/routes']);
      },
      error: (error) => {
        console.error('ERRO AO CRIAR ROTEIRO:', error);
      },
    });
  }
}