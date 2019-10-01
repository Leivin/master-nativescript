import { Injectable } from "@angular/core";

import { getString, setString } from "tns-core-modules/application-settings";

import { User } from "../models/user.model";

const _CURRENT_USER = "_CURRENT_USER";

@Injectable()
export class BackendService {

  public isUserLoggedIn(): boolean {
    let loggedIn = !!this.user;

    return loggedIn;
  }

//   public loginWithKinvey(user: User): Promise<any> {
//     let _user: Kinvey.User = Kinvey.User.getActiveUser();
//     if (_user) {
//       return _user.logout()
//         .then(() => this.performLogin(user));
//     } else {
//       return this.performLogin(user);
//     }
//   }

//   logout() {
//     return Kinvey.User.logout().then(() => {
//       this.user = "";
//     });
//   }

//   private performLogin(user: User) {
//     return Kinvey.User.login(user.email, user.password).then((_user: any) => {
//       this.user = JSON.stringify(_user)
//     });
//   }

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