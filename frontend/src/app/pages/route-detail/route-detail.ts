import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { ActivatedRoute } from '@angular/router';
import { RoutesService } from '../../services/routes';
import { FavouritesService } from '../../services/favourites.services';

@Component({
  selector: 'app-route-detail',
  imports: [Navbar],
  templateUrl: './route-detail.html',
  styleUrl: './route-detail.css',
})
export class RouteDetail implements OnInit {
  routeId: string | null = null;
  route: any = null;
  successMessage = '';
  errorMessage = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private routesService: RoutesService,
    private favouritesService: FavouritesService
  ) {}

  ngOnInit(): void {
    this.routeId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.routeId) {
      this.routesService.getRouteById(this.routeId).subscribe((data: any) => {
        this.route = data;
      });
    }
  }

  addToFavourites(): void {
    if (!this.route) return;

    this.successMessage = '';
    this.errorMessage = '';

    this.favouritesService.addFavourite(this.route.id).subscribe({
      next: () => {
        this.successMessage = 'Roteiro adicionado aos favoritos com sucesso.';
      },
      error: (error) => {
        console.error('ERRO AO ADICIONAR FAVORITO:', error);
        this.errorMessage = 'Não foi possível adicionar aos favoritos.';
      },
    });
  }
}