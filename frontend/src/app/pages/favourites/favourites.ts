import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { Navbar } from '../../components/navbar/navbar';
import { FavouritesService } from '../../services/favourites.services';

@Component({
  selector: 'app-favourites',
  imports: [Navbar, RouterLink],
  templateUrl: './favourites.html',
  styleUrl: './favourites.css',
})
export class Favourites implements OnInit {
  favouritesList: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(private favouritesService: FavouritesService) {}

  ngOnInit(): void {
    console.log('FAVOURITES PAGE LOADED');
    this.loadFavourites();
  }

  loadFavourites(): void {
  this.loading = true;

  this.favouritesService.getFavourites().subscribe({
    next: (response: any) => {
      this.favouritesList = response.favourites || [];
      this.loading = false;
    },
    error: (error: any) => {
      console.error('ERRO AO CARREGAR FAVORITOS:', error);
      this.errorMessage = 'Não foi possível carregar os favoritos.';
      this.loading = false;
    },
  });
}

  removeFavourite(routeId: string): void {
    this.favouritesService.removeFavourite(routeId).subscribe({
      next: () => {
        this.favouritesList = this.favouritesList.filter(
          (item) => item.route_id !== routeId && item.id !== routeId
        );
      },
      error: (error: any) => {
        console.error('ERRO AO REMOVER FAVORITO:', error);
      },
    });
  }
}