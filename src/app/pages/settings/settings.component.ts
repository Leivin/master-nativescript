import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../services/backend.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  settingsForm: FormGroup;

  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  private createForm() {
    this.settingsForm = this.formBuilder.group({

    });
  }

  submit() {

  }
}
