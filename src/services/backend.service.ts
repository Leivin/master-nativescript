import { Injectable } from "@angular/core";
import { getString, setString } from "tns-core-modules/application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

const firebase = require("nativescript-plugin-firebase");
const _CURRENT_USER = "_CURRENT_USER";

@Injectable()
export class BackendService {
  constructor(private routerExtensions: RouterExtensions) {}

  public isUserLoggedIn(): boolean {
    let loggedIn = !!this.user;

    return loggedIn;
  }

  logout() {
    firebase.logout();
    this.user = "";
    this.routerExtensions.navigate(["/login"]);
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.closeDrawer();
  }

  login(email: string, password: string) {
    let self = this;

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
        self.routerExtensions.navigate(["/"]);
      })
      .catch(error => {
        alert({
          title: "Nie udało się zalogować...",
          message: error,
          okButtonText: "OK"
        });
      });
  }

  register(email: string, password: string) {
    let self = this;

    firebase
      .createUser({
        email: email,
        password: password
      })
      .then(
        function(user) {
          alert({
            title: "Pomyślnie zarejestrowano",
            message: "Podany adres e-mail: " + user.email,
            okButtonText: "Przejdź do restauracji"
          });

          self.user = user.uid;
          self.routerExtensions.navigate(["/"]);
        },
        function(errorMessage) {
          alert({
            title: "Nie udało się zarejestrować...",
            message: errorMessage,
            okButtonText: "OK"
          });
        }
      );
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
