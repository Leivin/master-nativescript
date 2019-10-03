import { Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { AuthGuard } from "~/services/auth-guard.service";
import { LoginComponent } from "./login/login.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "about",
    component: AboutComponent,
    canActivate: [AuthGuard], //Przykład użycia AuthGuard
  },
  {
    path: "login",
    component: LoginComponent,
  }
];
