import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Navbar } from '../../components/navbar/navbar';
import { RoutesService } from '../../services/routes';
import { RoutePointsService } from '../../services/route-points';

@Component({
  selector: 'app-create-route',
  imports: [Navbar, FormsModule],
  templateUrl: './create-route.html',
  styleUrl: './create-route.css',
})
export class CreateRoute {
  route = {
    titulo: '',
    descricao: '',
    cidade: '',
    duracao: '',
    dificuldade: '',
    categoria: '',
    image_url: '',
  };

  points = [
    {
      name: '',
      descricao: '',
      morada: '',
      ordem: 1,
    },
  ];

  constructor(
    private routesService: RoutesService,
    private routePointsService: RoutePointsService,
    private router: Router
  ) {}

  addPointField(): void {
    this.points.push({
      name: '',
      descricao: '',
      morada: '',
      ordem: this.points.length + 1,
    });
  }

  removePointField(index: number): void {
    this.points.splice(index, 1);

    this.points = this.points.map((point, i) => ({
      ...point,
      ordem: i + 1,
    }));

    if (this.points.length === 0) {
      this.addPointField();
    }
  }

  createRoute(): void {
    const cleanedRoute = {
      titulo: this.route.titulo.trim(),
      descricao: this.route.descricao.trim(),
      cidade: this.route.cidade.trim(),
      duracao: this.route.duracao,
      dificuldade: this.route.dificuldade,
      categoria: this.route.categoria,
      image_url: this.route.image_url.trim(),
    };

    const validPoints = this.points
      .filter((point) => point.name.trim())
      .map((point, index) => ({
        name: point.name.trim(),
        descricao: point.descricao.trim(),
        morada: point.morada.trim(),
        ordem: index + 1,
      }));

    this.routesService.createRoute(cleanedRoute).subscribe({
      next: (response: any) => {
        console.log('CREATE ROUTE RESPONSE:', response);

        const routeId =
          response?.route?.id || response?.data?.id || response?.id;

        if (!routeId) {
          alert('O roteiro foi criado, mas não foi possível obter o ID.');
          this.router.navigate(['/routes']);
          return;
        }

        if (validPoints.length === 0) {
          alert('Roteiro criado com sucesso.');
          this.router.navigate(['/routes', routeId]);
          return;
        }

        const requests = validPoints.map((point) =>
          this.routePointsService.createPoint({
            route_id: String(routeId),
            name: point.name,
            descricao: point.descricao,
            morada: point.morada,
            ordem: point.ordem,
          })
        );

        forkJoin(requests).subscribe({
          next: () => {
            alert('Roteiro e pontos criados com sucesso.');
            this.router.navigate(['/routes', routeId]);
          },
          error: (error: any) => {
            console.error('Erro ao criar pontos do roteiro', error);
            alert(
              'O roteiro foi criado, mas houve um erro ao adicionar os pontos.'
            );
            this.router.navigate(['/routes/edit', routeId]);
          },
        });
      },
      error: (error: any) => {
        console.error('Erro ao criar roteiro', error);
        alert('Não foi possível criar o roteiro.');
      },
    });
  }
}
  