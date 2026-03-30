import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Navbar } from '../../components/navbar/navbar';
import { RoutesService } from '../../services/routes';
import { FavouritesService } from '../../services/favourites.services';

@Component({
  selector: 'app-routes-list',
  imports: [Navbar, RouterLink],
  templateUrl: './routes-list.html',
  styleUrl: './routes-list.css',
})
export class RoutesList implements OnInit, OnDestroy {
  routesList: any[] = [];
  private routerSubscription?: Subscription;

  constructor(
    private routesService: RoutesService,
    private favouritesService: FavouritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRoutes();

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.urlAfterRedirects === '/routes') {
          this.loadRoutes();
        }
      });
  }

  loadRoutes(): void {
    this.routesService.getRoutes().subscribe({
      next: (data: any) => {
        console.log('RESPOSTA BACKEND:', data);
        this.routesList = data.data || [];
      },
      error: (err: any) => {
        console.error('Erro ao buscar roteiros', err);
      },
    });
  }

  addToFavourites(routeId: string): void {
    this.favouritesService.addFavourite(routeId).subscribe({
      next: () => {
        console.log('Favorito adicionado');
      },
      error: (err: any) => {
        console.error('Erro ao adicionar favorito', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
}