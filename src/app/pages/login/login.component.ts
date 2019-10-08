import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { prompt } from 'tns-core-modules/ui/dialogs';

import { BackendService } from '../../../services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['']
    });
  }

  toggleForm() {
    this.signInForm = !this.signInForm;
  }

  submit() {
    // TODO: Ładniejsza walidacja
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    if (this.signInForm) {
      this.login(email, password);
    } else {
      this.register(email, password);
    }
  }

  login(email, password) {
    this.backendService.login(email, password);
  }

  register(email, password) {
    this.backendService.register(email, password);
  }

  forgotPassword() {
    prompt({
      title: 'Zapomniałeś hasła?',
      message:
        'Podaj adres e-mail, którego użyłeś do zarejestrowania konta - wyślemy Ci e-mail z linkiem do zresetowania hasła!',
      inputType: 'email',
      defaultText: '',
      okButtonText: 'OK',
      cancelButtonText: 'Anuluj'
    }).then(data => {
      if (data.result) {
        console.log(data.text.trim());
      }
    });
  }
}
