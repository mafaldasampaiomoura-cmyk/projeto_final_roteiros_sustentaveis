import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { ActivatedRoute } from '@angular/router';
import { RoutesService } from '../../services/routes';

@Component({
  selector: 'app-route-detail',
  imports: [Navbar],
  templateUrl: './route-detail.html',
  styleUrl: './route-detail.css',
})
export class RouteDetail implements OnInit {
  routeId: string | null = null;
  route: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private routesService: RoutesService
  ) {}

  ngOnInit(): void {
    this.routeId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.routeId) {
      this.routesService.getRouteById(this.routeId).subscribe((data: any) => {
        console.log('ROTEIRO:', data);
        this.route = data;
      });
    }
  }
}