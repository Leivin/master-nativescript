import { Component, OnInit } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position, Style } from 'nativescript-google-maps-sdk';
import * as permissions from 'nativescript-permissions';
import { Image } from 'tns-core-modules/ui/image';
import { ImageSource } from 'tns-core-modules/image-source';
import googleMapsStyles from '../../../shared/google-maps-styles';
import { Restaurant } from '~/interfaces/restaurant';
import { RouterExtensions } from 'nativescript-angular/router';

declare var android: any;

// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);

const firebase = require('nativescript-plugin-firebase/app');

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

  constructor(private routerExtensions: RouterExtensions) {}

  ngOnInit() {}

  getRestaurants() {
    const restaurants = firebase
      .firestore()
      .collection('restaurants')
      .limit(20);

    const mapIcon = new ImageSource();
    mapIcon.loadFromFile('~/assets/images/map_pin.png');
    const icon = new Image();
    icon.imageSource = mapIcon;

    // Get restaurants and assign them to local variable
    restaurants.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const restaurant: Restaurant = {
          ...doc.data(),
          id: doc.id
        };

        const marker = new Marker();
        marker.position = Position.positionFromLatLng(
          restaurant.coordinates.latitude,
          restaurant.coordinates.longitude
        );
        marker.title = restaurant.name;
        marker.snippet = restaurant.address;
        marker.icon = icon;
        marker.userData = {
          id: restaurant.id
        };

        this.mapView.addMarker(marker);
      });
    });
  }

  // Map events
  onMapReady(event) {
    this.mapView = event.object;
    this.mapView.setStyle(<Style>googleMapsStyles);

    this.requestPermissions().then(granted => {
      if (granted) {
        this.mapView.myLocationEnabled = true;
        this.mapView.settings.myLocationButtonEnabled = true;
      }
    });

    this.getRestaurants();
  }

  onMarkerInfoWindowTapped(event) {
    const id = event.marker.userData.id;

    this.routerExtensions.navigate(['/restaurant'], {
      transition: {
        name: 'slide'
      },
      queryParams: {
        restaurantId: id
      }
    });
  }

  onSearchBarLoaded(event) {
    if (event.object.android) {
      event.object.android.clearFocus();
    }
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
        .catch(function() {
          resolve(false);
        });
    });
  }
}
