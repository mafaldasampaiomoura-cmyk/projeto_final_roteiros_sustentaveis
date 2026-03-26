import {Routes} from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { RoutesList } from './pages/routes-list/routes-list';
import { RouteDetail } from './pages/route-detail/route-detail';
import { CreateRoute } from './pages/create-route/create-route';
import { Favourites } from './pages/favourites/favourites';


export const routes: Routes =[
    {path: '', component: Home},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'routes', component: RoutesList},
    {path: 'routes/:id', component: RouteDetail}, // routes/:id por causa dos diferentes ids que a minha rota tem 
    {path: 'create-route', component: CreateRoute},
    {path: 'favourites', component: Favourites},
    {path: '**', redirectTo: ''}
]