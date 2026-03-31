import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { RoutesList } from './pages/routes-list/routes-list';
import { RouteDetail } from './pages/route-detail/route-detail';
import { CreateRoute } from './pages/create-route/create-route';
import { Favourites } from './pages/favourites/favourites';
import { EditRoute } from './pages/edit-route/edit-route';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'routes/edit/:id', component: EditRoute, canActivate: [authGuard] },
  { path: 'routes/:id', component: RouteDetail, canActivate: [authGuard] },
  { path: 'create-route', component: CreateRoute, canActivate: [authGuard] },
  { path: 'favourites', component: Favourites, canActivate: [authGuard] },
  { path: 'routes', component: RoutesList, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];