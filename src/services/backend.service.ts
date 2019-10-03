import { Injectable } from "@angular/core";
import { getString, setString } from "tns-core-modules/application-settings";

import { User } from "../models/user.model";

const firebase = require("nativescript-plugin-firebase");
const _CURRENT_USER = "_CURRENT_USER";

@Injectable()
export class BackendService {

  public isUserLoggedIn(): boolean {
    let loggedIn = !!this.user;

    return loggedIn;
  }

  logout() {
    return firebase.logout().then(() => {
        this.user = "";
    });
  }

//   private performLogin(user: User) {
//     return Kinvey.User.login(user.email, user.password).then((_user: any) => {
//       this.user = JSON.stringify(_user)
//     });
//   }

  register(email, password) {
    firebase.createUser({
      email: 'eddyverbruggen@gmail.com',
      password: 'firebase'
    }).then(
        function (user) {
          alert({
            title: "User created",
            message: "email: " + user.email,
            okButtonText: "Nice!"
          })

          console.log(user);
        },
        function (errorMessage) {
          alert({
            title: "No user created",
            message: errorMessage,
            okButtonText: "OK, got it"
          })
        }
    );
  }

  private get user(): string {
    return getString(_CURRENT_USER);
  }

  private set user(theToken: string) {
    setString(_CURRENT_USER, theToken);
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