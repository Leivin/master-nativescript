import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import {
  DrawerTransitionBase,
  RadSideDrawer,
  SlideInOnTopTransition
} from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";

import { BackendService } from "../services/backend.service";

const firebase = require("nativescript-plugin-firebase");

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  private _activatedUrl: string;
  private _sideDrawerTransition: DrawerTransitionBase;
  isUserLoggedIn: boolean;

  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this._activatedUrl = "/home";
    this._sideDrawerTransition = new SlideInOnTopTransition();

    this.isUserLoggedIn = this.backendService.isUserLoggedIn();

    let self = this;

    firebase
      .init({
        onAuthStateChanged: function(data) {
          self.isUserLoggedIn = data.loggedIn;
        }
      })
      .then(
        () => {
          console.log("firebase.init done");
        },
        error => {
          console.log(`firebase.init error: ${error}`);
        }
      );

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this._activatedUrl = event.urlAfterRedirects;
      });
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url;
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: "fade"
      }
    });

    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.closeDrawer();
  }
}
