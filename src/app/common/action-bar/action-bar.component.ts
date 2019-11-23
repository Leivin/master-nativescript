import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  toggleDrawer(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.toggleDrawerState();
  }
}
