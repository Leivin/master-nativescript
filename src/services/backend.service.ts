import { Injectable } from '@angular/core';
import { getString, setString } from 'tns-core-modules/application-settings';
import { RouterExtensions } from 'nativescript-angular/router';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';

const firebase = require('nativescript-plugin-firebase');
const _CURRENT_USER = '_CURRENT_USER';

@Injectable()
export class BackendService {
  isLoading = false;

  constructor(private routerExtensions: RouterExtensions) {}

  public isUserLoggedIn(): boolean {
    const loggedIn = !!this.user;

    return loggedIn;
  }

  public getUser(): string {
    return this.user;
  }

  logout() {
    this.isLoading = true;

    firebase.logout();
    this.user = '';
    this.isLoading = false;

    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.closeDrawer();

    this.routerExtensions.navigate(['/login'], { clearHistory: true });
  }

  login(email: string, password: string) {
    const self = this;
    this.isLoading = true;

    firebase
      .login({
        type: firebase.LoginType.PASSWORD,
        passwordOptions: {
          email: email,
          password: password
        }
      })
      .then(result => {
        self.user = result.uid;
        self.isLoading = false;
        self.routerExtensions.navigate(['/'], { clearHistory: true });
      })
      .catch(error => {
        self.isLoading = false;

        alert({
          title: 'Nie udało się zalogować...',
          message: error,
          okButtonText: 'OK'
        });
      });
  }

  register(email: string, password: string) {
    const self = this;
    this.isLoading = true;

    firebase
      .createUser({
        email: email,
        password: password
      })
      .then(
        function(user) {
          self.isLoading = false;
          self.createUserInDB(user.uid);

          alert({
            title: 'Pomyślnie zarejestrowano',
            message: 'Podany adres e-mail: ' + user.email,
            okButtonText: 'Przejdź do restauracji'
          });

          self.user = user.uid;
          self.routerExtensions.navigate(['/'], { clearHistory: true });
        },
        function(errorMessage) {
          alert({
            title: 'Nie udało się zarejestrować...',
            message: errorMessage,
            okButtonText: 'OK'
          });

          self.isLoading = false;
        }
      );
  }

  private createUserInDB(uid: string) {
    const usersCollection = firebase.firestore.collection('users');

    usersCollection.doc(uid).set({
      restaurants_to_favourite: [],
      restaurants_to_visit: [],
      restaurants_visited: []
    });
  }

  private get user(): string {
    return getString(_CURRENT_USER);
  }

  private set user(uid: string) {
    setString(_CURRENT_USER, uid);
  }

  //   public forgetPassword(email: string) {
  //     return Kinvey.User.resetPassword(email)
  //       .then((data) => {
  //         console.debug('Data', data)
  //       })
  //       .catch((error: Kinvey.BaseError) => {
  //         console.debug('Error', error)
  //       });
  //   }
}
