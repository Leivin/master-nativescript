import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Restaurant } from '../../../interfaces/restaurant';

const firebase = require('nativescript-plugin-firebase/app');

@Component({
  selector: 'app-my-restaurants',
  templateUrl: './my-restaurants.component.html',
  styleUrls: ['./my-restaurants.component.scss']
})
export class MyRestaurantsComponent implements OnInit, AfterViewInit {
  recommendedRestaurants: Array<Restaurant> = [];
  favouriteRestaurants: Array<Restaurant> = [];
  visitedRestaurants: Array<Restaurant> = [];
  restaurantsToVisit: Array<Restaurant> = [];

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    // TODO: Implement loader
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    // Prepare query from Firebase
    const restaurants = firebase.firestore().collection('restaurants');

    // Get restaurants and assign them to local variable
    restaurants.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const restaurant: Restaurant = {
          ...doc.data(),
          id: doc.id
        };
        this.recommendedRestaurants.push(restaurant);
      });

      this.getUserRestaurants();
    });
  }

  getUserRestaurants() {
    const userToRestaurants = firebase
      .firestore()
      .collection('users')
      .doc('default');

    // Get user to restaurants
    userToRestaurants.get().then(doc => {
      const userRestaurants = doc.data();
      const favouriteRestaurants = userRestaurants.restaurants_favourite;
      const visitedRestaurants = userRestaurants.restaurants_visited;
      const restaurantsToVisit = userRestaurants.restaurants_to_visit;

      this.favouriteRestaurants = this.recommendedRestaurants.filter(
        restaurant => {
          // tslint:disable-next-line: prefer-const
          for (let index in favouriteRestaurants) {
            if (favouriteRestaurants[index].id === restaurant.id) {
              return true;
            }
          }
        }
      );

      this.visitedRestaurants = this.recommendedRestaurants.filter(
        restaurant => {
          // tslint:disable-next-line: prefer-const
          for (let index in visitedRestaurants) {
            if (visitedRestaurants[index].id === restaurant.id) {
              return true;
            }
          }
        }
      );

      this.restaurantsToVisit = this.recommendedRestaurants.filter(
        restaurant => {
          // tslint:disable-next-line: prefer-const
          for (let index in restaurantsToVisit) {
            if (restaurantsToVisit[index].id === restaurant.id) {
              return true;
            }
          }
        }
      );
    });
  }
}
