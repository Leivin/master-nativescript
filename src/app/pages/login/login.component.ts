import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { alert, prompt } from "tns-core-modules/ui/dialogs";

import { BackendService } from "../../../services/backend.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  signInForm = true;
  loginForm: FormGroup;

  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({ 
      email:  ['', Validators.required], 
      password: ['', Validators.required], 
      confirmPassword: ['']
    });
  }

  toggleForm() {
    this.signInForm = !this.signInForm;
  }

  submit() {
    // TODO: Ładniejsza walidacja

    if (this.signInForm) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    let email = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;

    if (!email || !password) {
      return;
    }

    this.backendService.login(email, password);
  }

  register() {
    let email = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;

    if (!email || !password) {
      return;
    }

    this.backendService.register(email, password);
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
