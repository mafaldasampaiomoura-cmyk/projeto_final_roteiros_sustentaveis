import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Navbar } from '../../components/navbar/navbar';
import { RoutesService } from '../../services/routes';

@Component({
  selector: 'app-routes-list',
  imports: [Navbar, RouterLink],
  templateUrl: './routes-list.html',
  styleUrl: './routes-list.css',
})
export class RoutesList implements OnInit, OnDestroy {
  routesList: any[] = [];
  loading = true;
  private routerSubscription?: Subscription;

  constructor(
    private routesService: RoutesService,
    private router: Router,
    private cdr: ChangeDetectorRef
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
    this.loading = true;
    this.cdr.detectChanges();

    this.routesService.getRoutes().subscribe({
      next: (data: any) => {
        console.log('ROUTES RESPONSE:', data);

        this.routesList = data.data || data.routes || data || [];

        console.log('PRIMEIRO ROUTE:', this.routesList[0]);
        console.log('IMAGE URL:', this.routesList[0]?.image_url);

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Erro ao buscar roteiros', err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
}