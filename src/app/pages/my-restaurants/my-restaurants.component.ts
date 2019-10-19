import { Component, OnInit } from '@angular/core';

const firebase = require('nativescript-plugin-firebase/app');

@Component({
  selector: 'app-my-restaurants',
  templateUrl: './my-restaurants.component.html',
  styleUrls: ['./my-restaurants.component.scss']
})
export class MyRestaurantsComponent implements OnInit {
  // TODO: Interface for Restaurant
  recommendedRestaurants = [];

  constructor() {}

  ngOnInit() {
    // TODO: Implement loader
    this.downloadRestaurants();
  }

  downloadRestaurants() {
    // Prepare query from Firebase
    const restaurants = firebase.firestore().collection('restaurants');
    const defaultRestaurant = firebase.firestore().collection('restaurants').doc('default');
    const userToRestaurants = firebase.firestore().collection('users').doc('default');
    const commentaries = firebase.firestore().collection('commentaries').where('restaurant', '==', defaultRestaurant);

    // Get restaurants and assign them to local variable
    restaurants.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.recommendedRestaurants.push(doc.data());
        console.log(doc.data());
      });
      console.log('--------------');
    });

    // Get user to restaurants
    userToRestaurants.get().then(doc => {
      console.log(doc.data());
      console.log('--------------');
    });

    // Get commentaries
    commentaries.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.data());
      });
      console.log('--------------');
    });
  }
}
