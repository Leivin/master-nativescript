import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthGuard } from '~/services/auth-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { MyRestaurantsComponent } from './pages/my-restaurants/my-restaurants.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'my-restaurants',
    component: MyRestaurantsComponent,
    canActivate: [AuthGuard] // Ścieżka nie jest dostępna dla niezalogowanych użytkowników
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
