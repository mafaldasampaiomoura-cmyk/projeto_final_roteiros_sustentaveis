import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';
import { RoutesService } from '../../services/routes';
import { RoutePointsService } from '../../services/route-points';

@Component({
  selector: 'app-edit-route',
  imports: [Navbar, FormsModule],
  templateUrl: './edit-route.html',
  styleUrl: './edit-route.css',
})
export class EditRoute implements OnInit {
  currentRoute: any = null;

  newPoint = {
    name: '',
    descricao: '',
    morada: '',
    ordem: 1,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private routesService: RoutesService,
    private routePointsService: RoutePointsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.loadRoute(id);
    }
  }

  loadRoute(id: string): void {
    this.routesService.getRouteById(id).subscribe({
      next: (response: any) => {
        console.log('EDIT RESPONSE:', response);
        this.currentRoute = response;

        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

        if (this.currentRoute.user_id !== storedUser.id) {
          alert('Não tens permissão para editar este roteiro.');
          this.router.navigate(['/routes', this.currentRoute.id]);
          return;
        }
        
        const nextOrder = (this.currentRoute.points?.length || 0) + 1; 

        this.newPoint = {
          name: '',
          descricao: '',
          morada: '', 
          ordem: nextOrder,
        }
        console.log('CURRENT ROUTE FINAL:', this.currentRoute);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar roteiro:', error);
      },
    });
  }

  updateRoute(): void {
    if (!this.currentRoute?.id) return;

    const routeData = {
      titulo: this.currentRoute.titulo,
      descricao: this.currentRoute.descricao,
      duracao: this.currentRoute.duracao,
      dificuldade: this.currentRoute.dificuldade,
      cidade: this.currentRoute.cidade,
      categoria: this.currentRoute.categoria,
      image_url: this.currentRoute.image_url,
    };

    console.log('ROUTE DATA TO UPDATE:', routeData);

    this.routesService.updateRoute(this.currentRoute.id, routeData).subscribe({
      next: () => {
        alert('Roteiro atualizado com sucesso.');
        this.router.navigate(['/routes', this.currentRoute.id]);
      },
      error: (err: any) => {
        console.error('Erro ao atualizar roteiro', err);
        alert('Não foi possível atualizar o roteiro.');
      },
    });
  }

  addPoint(): void {
    if (!this.currentRoute?.id) return;

    const pointData = {
      route_id: this.currentRoute.id,
      name: this.newPoint.name,
      descricao: this.newPoint.descricao,
      morada: this.newPoint.morada,
      ordem: Number(this.newPoint.ordem),
    };

    this.routePointsService.createPoint(pointData).subscribe({
      next: () => {
        alert('Ponto adicionado com sucesso.');

        this.newPoint = {
          name: '',
          descricao: '',
          morada: '',
          ordem: (this.currentRoute?.points?.length || 0) + 1,
        };

        this.loadRoute(String(this.currentRoute.id));
      },
      error: (error: any) => {
        console.error('Erro ao adicionar ponto', error);
        alert(error?.error?.message || 'Não foi possível adicionar o ponto.');
      },
    });
  }

  deletePoint(pointId: string): void {
    const confirmDelete = confirm('Eliminar este ponto do roteiro?');
    if (!confirmDelete) return;

    this.routePointsService.deletePoint(pointId).subscribe({
      next: () => {
        alert('Ponto eliminado com sucesso.');
        this.loadRoute(String(this.currentRoute.id));
      },
      error: (error: any) => {
        console.error('Erro ao eliminar ponto', error);
        alert('Não foi possível eliminar o ponto.');
      },
    });
  }
}