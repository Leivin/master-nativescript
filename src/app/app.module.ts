import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { LoaderComponent } from './common/loader/loader.component';
import { MyRestaurantsComponent } from './pages/my-restaurants/my-restaurants.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { CommentsComponent } from './partials/comments/comments.component';
import { AddCommentComponent } from './partials/add-comment/add-comment.component';
import { ActionBarComponent } from './common/action-bar/action-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    LoaderComponent,
    MyRestaurantsComponent,
    SettingsComponent,
    RestaurantComponent,
    CommentsComponent,
    AddCommentComponent,
    ActionBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
