import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-restaurants',
  templateUrl: './my-restaurants.component.html',
  styleUrls: ['./my-restaurants.component.scss']
})
export class MyRestaurantsComponent implements OnInit {
  recommendedRestaurants = [ // Only for styling purposes
    {
      name: 'Super restauracja',
      description: 'Odwiedźcie nas koniecznie!'
    },
    {
      name: 'Lepsza restauracja',
      description: 'Lepszej nie znajdziecie.'
    },
    {
      name: 'Ostatnia restauracja',
      description: 'Lubimy dżem.'
    },
  ];

  constructor() {}

  ngOnInit() {}
}
