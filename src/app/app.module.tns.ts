import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { LoaderComponent } from './common/loader/loader.component';
import { MyRestaurantsComponent } from './pages/my-restaurants/my-restaurants.component';
import { SettingsComponent } from './pages/settings/settings.component';

import { BackendService } from '../services/backend.service';
import { AuthGuard } from '../services/auth-guard.service';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { CommentsComponent } from './partials/comments/comments.component';
import { AddCommentComponent } from './partials/add-comment/add-comment.component';
import { ActionBarComponent } from './common/action-bar/action-bar.component';


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

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
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptUISideDrawerModule,
    ReactiveFormsModule,
    NativeScriptFormsModule,
    NativeScriptUIListViewModule
  ],
  providers: [
    BackendService,
    [AuthGuard]
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
