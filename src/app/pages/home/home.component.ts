import { Component, OnInit } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position, Style } from 'nativescript-google-maps-sdk';
import * as permissions from 'nativescript-permissions';
import { Image } from 'tns-core-modules/ui/image';
import { ImageSource } from 'tns-core-modules/image-source';
import googleMapsStyles from '../../../shared/google-maps-styles';

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

  constructor() {}

  ngOnInit() {}

  // Map events
  onMapReady(event) {
    this.mapView = event.object;
    this.mapView.setStyle(<Style>googleMapsStyles);

    const marker = new Marker();
    marker.position = Position.positionFromLatLng(52.27, 21.04);
    marker.title = 'Paweł Kosmala';
    marker.snippet = 'Miłość mojego życia';

    const imageSource = new ImageSource();
    imageSource.loadFromFile('~/assets/images/map_pin.png');
    const icon = new Image();
    icon.imageSource = imageSource;

    marker.icon = icon;
    this.mapView.addMarker(marker);

    this.requestPermissions().then(granted => {
      if (granted) {
        this.mapView.myLocationEnabled = true;
        this.mapView.settings.myLocationButtonEnabled = true;
      }
    });
  }

  requestPermissions() {
    return new Promise(function(resolve) {
      permissions
        .requestPermission([
          android.Manifest.permission.ACCESS_FINE_LOCATION,
          android.Manifest.permission.ACCESS_COARSE_LOCATION
        ])
        .then(function() {
          resolve(true);
        })
        .catch(function(result) {
          console.log('Permissions failed :(', result);
          resolve(false);
        });
    });
  }
}
