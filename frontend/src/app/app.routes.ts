import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { RoutesList } from './pages/routes-list/routes-list';
import { RouteDetail } from './pages/route-detail/route-detail';
import { CreateRoute } from './pages/create-route/create-route';
import { Favourites } from './pages/favourites/favourites';
import { EditRoute } from './pages/edit-route/edit-route';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'routes', component: RoutesList },
  { path: 'routes/edit/:id', component: EditRoute },
  { path: 'routes/:id', component: RouteDetail },
  { path: 'create-route', component: CreateRoute },
  { path: 'favourites', component: Favourites },
  { path: '**', redirectTo: '' },
];