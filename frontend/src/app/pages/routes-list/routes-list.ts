import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { OnInit } from '@angular/core';
import { RoutesService } from '../../services/routes';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-routes-list',
  imports: [Navbar, RouterLink],
  templateUrl: './routes-list.html',
  styleUrl: './routes-list.css',
})

export class RoutesList implements OnInit {
  routesList: any[] = []; 

  constructor(private routesService: RoutesService) {}

  ngOnInit(): void {
    this.routesService.getRoutes().subscribe((data: any) => {
    console.log('RESPOSTA BACKEND:', data);
    this.routesList = data.data;
    });
  }
}

