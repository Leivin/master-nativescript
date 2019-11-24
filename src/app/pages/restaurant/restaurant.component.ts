import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Restaurant } from '../../../interfaces/restaurant';
import { ActivatedRoute } from '@angular/router';
import { MapView, Marker, Position, Style } from 'nativescript-google-maps-sdk';
import googleMapsStyles from '../../../shared/google-maps-styles';
import { Image } from 'tns-core-modules/ui/image';
import { ImageSource } from 'tns-core-modules/image-source';
import { registerElement } from 'nativescript-angular/element-registry';
import { Carousel, CarouselItem } from 'nativescript-carousel';

// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);
registerElement('Carousel', () => Carousel);
registerElement('CarouselItem', () => CarouselItem);

const firebase = require('nativescript-plugin-firebase/app');

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit, AfterViewInit {
  restaurant: Restaurant = { id: '' };
  restaurantId = '';
  isLoading = true;

  latitude = 52.26;
  longitude = 21.01;
  zoom = 12;
  minZoom = 0;
  maxZoom = 22;
  bearing = 0;
  tilt = 0;
  padding = [40, 40, 40, 40];
  miniMapView: MapView;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    if (this.route.snapshot.queryParams) {
      const query = this.route.snapshot.queryParams;
      this.restaurantId = query.restaurantId;
    }
  }

  ngAfterViewInit() {}

  getRestaurant() {
    // Prepare query from Firebase
    const singleRestaurant = firebase
      .firestore()
      .collection('restaurants')
      .doc(this.restaurantId);

    // Get restaurant and assign it to local variable
    singleRestaurant.get().then(doc => {
      if (doc.exists) {
        this.restaurant = {
          ...doc.data(),
          id: doc.id
        };

        this.initMapView();
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    });
  }

  // Map events
  onMapReady(event) {
    this.miniMapView = event.object;
    this.miniMapView.setStyle(<Style>googleMapsStyles);

    this.getRestaurant();
  }

  initMapView() {
    const mapIcon = new ImageSource();
    mapIcon.loadFromFile('~/assets/images/map_pin.png');
    const icon = new Image();
    icon.imageSource = mapIcon;

    const marker = new Marker();
    marker.position = Position.positionFromLatLng(
      this.restaurant.coordinates.latitude,
      this.restaurant.coordinates.longitude
    );

    marker.icon = icon;

    this.miniMapView.addMarker(marker);
    this.miniMapView.latitude = this.restaurant.coordinates.latitude;
    this.miniMapView.longitude = this.restaurant.coordinates.longitude;
    this.isLoading = false;
  }
}
