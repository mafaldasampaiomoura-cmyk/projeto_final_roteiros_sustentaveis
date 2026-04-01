import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Navbar } from '../../components/navbar/navbar';
import { FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-favourites',
  imports: [Navbar, RouterLink],
  templateUrl: './favourites.html',
  styleUrl: './favourites.css',
})
export class Favourites implements OnInit, OnDestroy {
  favourites: any[] = [];
  loading = true;
  private routerSubscription?: Subscription;

  constructor(
    private favoritesService: FavoritesService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFavorites();

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.urlAfterRedirects === '/favourites') {
          this.loadFavorites();
        }
      });
  }

  loadFavorites(): void {
    this.loading = true;
    this.cdr.detectChanges();

    this.favoritesService.getFavorites().subscribe({
      next: (response: any) => {
        console.log('FAVOURITES RESPONSE:', response);
        this.favourites = response.favourites || response.data || [];

        console.log('PRIMEIRO FAVORITO:', this.favourites[0]);
        console.log('IMAGE URL FAVORITO:', this.favourites[0]?.routes?.image_url);

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Erro ao carregar favoritos', error);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  removeFavorite(routeId: string): void {
    this.favoritesService.removeFavorite(routeId).subscribe({
      next: () => {
        this.loadFavorites();
      },
      error: (error: any) => {
        console.error('Erro ao remover favorito', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
}