import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { alert, prompt } from "tns-core-modules/ui/dialogs";

import { BackendService } from "../../services/backend.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  //TODO: Nie działa binding pól tekstowych...
  signInForm: Boolean = true;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private backendService: BackendService,
    private router: Router
  ) {
  }

  toggleForm() {
    this.signInForm = !this.signInForm;
  }

  submit() {
    // TODO: Ładniejsza walidacja
    console.log(this.email, this.password)
    if (!this.email || !this.password) {
      this.alert("Uzupełnij wymagane pola");
      return;
    }

    if (this.signInForm) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    console.log("login!");
  }

  register() {
    this.backendService.register(name, this.password);
  }

  forgotPassword() {
    prompt({
      title: "Zapomniałeś hasła?",
      message:
        "Podaj adres e-mail, którego użyłeś do zarejestrowania konta - wyślemy Ci e-mail z linkiem do zresetowania hasła!",
      inputType: "email",
      defaultText: "",
      okButtonText: "OK",
      cancelButtonText: "Anuluj"
    }).then(data => {
      if (data.result) {
        console.log(data.text.trim());
      }
    });
  }

  alert(message: string) {
    return alert({
      title: "Błąd walidacji",
      okButtonText: "OK",
      message: message
    });
  }
}
