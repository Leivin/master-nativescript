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
      // todo: custom validator for password length - only when register
      password: ['', [Validators.required, Validators.minLength(6)]],
      // todo: custom validator for confirmPassword - same as password
      confirmPassword: ['']
    });
  }

  toggleForm() {
    this.signInForm = !this.signInForm;
  }

  submit() {
    const email = this.email.value;
    const password = this.password.value;

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

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get confirmPassword() { return this.loginForm.get('confirmPassword'); }
}
