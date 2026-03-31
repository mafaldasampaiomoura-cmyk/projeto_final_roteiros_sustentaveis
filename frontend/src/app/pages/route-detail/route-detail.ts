import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Navbar } from '../../components/navbar/navbar';
import { RoutesService } from '../../services/routes';
import { FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-route-detail',
  imports: [Navbar, RouterLink],
  templateUrl: './route-detail.html',
  styleUrl: './route-detail.css',
})
export class RouteDetail implements OnInit, OnDestroy {
  routeId: string | null = null;
  route: any = null;
  isOwner = false;
  private routeSubscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private routesService: RoutesService,
    private favoritesService: FavoritesService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.routeId = id;
        this.loadRoute(id);
      }
    });
  }

  loadRoute(id: string): void {
    this.route = null;
    this.isOwner = false;
    this.cdr.detectChanges();

    this.routesService.getRouteById(id).subscribe({
        next: (data: any) => {
          console.log('DETAIL RESPONSE:', data);
          console.log('DETAIL POINTS:', data.points || data.route?.points || []);

          const routeData = data.route || data;
          const pointsData = data.points || routeData.points || [];

          this.route = {
            ...routeData,
            points: pointsData,
          };

          const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
          this.isOwner = this.route.user_id === storedUser.id;

          this.cdr.detectChanges();
        },
      error: (error: any) => {
        console.error('Erro ao carregar roteiro', error);
        this.cdr.detectChanges();
      },
    });
  }

  addToFavorites(): void {
    if (!this.route?.id) return;

    this.favoritesService.addFavorite(this.route.id).subscribe({
      next: () => {
        alert('Roteiro adicionado aos favoritos.');
      },
      error: (error: any) => {
        console.error('Erro ao adicionar favorito', error);
      },
    });
  }

  deleteRoute(): void {
    if (!this.route?.id || !this.isOwner) return;

    const confirmDelete = confirm(
      'Tens a certeza que queres eliminar este roteiro?'
    );

    if (!confirmDelete) return;

    this.routesService.deleteRoute(this.route.id).subscribe({
      next: () => {
        alert('Roteiro eliminado com sucesso.');
        this.router.navigate(['/routes']);
      },
      error: (error: any) => {
        console.error('Erro ao eliminar roteiro', error);
      },
    });
  }

  getGoogleMapsLink(address: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}