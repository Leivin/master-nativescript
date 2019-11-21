import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Restaurant } from '../../../interfaces/restaurant';
import { ActivatedRoute } from '@angular/router';

const firebase = require('nativescript-plugin-firebase/app');

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit, AfterViewInit {
  restaurantId = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    if (this.route.snapshot.queryParams) {
      const query = this.route.snapshot.queryParams;
      this.restaurantId = query.restaurantId;
    }
  }

  ngAfterViewInit() {
    this.getRestaurant();
  }

  getRestaurant() {
    // Prepare query from Firebase
    const singleRestaurant = firebase
      .firestore()
      .collection('restaurants')
      .doc(this.restaurantId);

    // Get restaurant and assign it to local variable
    singleRestaurant.get().then(querySnapshot => {
      if (querySnapshot.exists) {
        console.log('Document data:', querySnapshot.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    });
  }
}
