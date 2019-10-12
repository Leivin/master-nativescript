import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { prompt } from 'tns-core-modules/ui/dialogs';

import { BackendService } from '../../../services/backend.service';
import { samePasswordValueValidator } from '~/shared/same-password-value.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signInMode = true;
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
      password: [
        '',
        [
          Validators.required,
          this.signInMode ? Validators.nullValidator : Validators.minLength(6)
        ]
      ],
      confirmPassword: [
        '',
        [
          this.signInMode ? Validators.nullValidator : Validators.required,
          samePasswordValueValidator('password')
        ]
      ]
    });
  }

  toggleForm() {
    this.signInMode = !this.signInMode;
    this.resetPasswordValidators();
  }

  resetPasswordValidators() {
    this.loginForm.controls['password'].setValidators([
      Validators.required,
      this.signInMode ? Validators.nullValidator : Validators.minLength(6)
    ]);
    this.loginForm.controls['confirmPassword'].setValidators([
      this.signInMode ? Validators.nullValidator : Validators.required,
      samePasswordValueValidator('password')
    ]);

    this.loginForm.controls['password'].updateValueAndValidity();
    this.loginForm.controls['confirmPassword'].updateValueAndValidity();
  }

  submit() {
    const email = this.email.value;
    const password = this.password.value;

    if (this.signInMode) {
      this.login(email, password);
    } else {
      this.register(email, password);
    }
  }

  login(email, password) {
    this.backendService.login(email, password);
  }

  register(email, password) {
    if (this.confirmPassword.value !== password) {
      alert('Podane hasła nie są identyczne!');
      return;
    }

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

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get confirmPassword() {
    return this.loginForm.get('confirmPassword');
  }
}
