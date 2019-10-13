import { Component, OnInit } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import * as permissions from 'nativescript-permissions';

declare var android: any;

// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  latitude = 52.26;
  longitude = 21.01;
  zoom = 12;
  minZoom = 0;
  maxZoom = 22;
  bearing = 0;
  tilt = 0;
  padding = [40, 40, 40, 40];
  mapView: MapView;

  lastCamera: String;

  constructor() {}

  ngOnInit() {}

  // Map events
  onMapReady(event) {
    console.log('Map Ready');

    this.mapView = event.object;

    console.log('Setting a marker...');

    let marker = new Marker();
    marker.position = Position.positionFromLatLng(52.27, 21.04);
    marker.title = 'Paweł Kosmala';
    marker.snippet = 'Miłość mojego życia';
    marker.userData = { index: 1 };
    this.mapView.addMarker(marker);
    this.requestPermissions().then(granted => {
      if (granted) {
        console.log('Enabling My Location..');
        this.mapView.myLocationEnabled = true;
        this.mapView.settings.myLocationButtonEnabled = true;
      }
    });
  }

  onCoordinateTapped(args) {
    console.log(
      'Coordinate Tapped, Lat: ' +
        args.position.latitude +
        ', Lon: ' +
        args.position.longitude,
      args
    );
  }

  onMarkerEvent(args) {
    console.log(
      'Marker Event: \'' +
        args.eventName +
        '\' triggered on: ' +
        args.marker.title +
        ', Lat: ' +
        args.marker.position.latitude +
        ', Lon: ' +
        args.marker.position.longitude,
      args
    );
  }

  requestPermissions() {
    return new Promise(function(resolve, reject) {
      permissions
        .requestPermission(
          [
            android.Manifest.permission.ACCESS_FINE_LOCATION,
            android.Manifest.permission.ACCESS_COARSE_LOCATION
          ],
        )
        .then(function(result) {
          console.log('Permissions granted!');
          resolve(true);
        })
        .catch(function(result) {
          console.log('Permissions failed :(', result);
          resolve(false);
        });
    });
  }
}
