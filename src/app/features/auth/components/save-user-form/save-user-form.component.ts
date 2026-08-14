import { Component, Input } from '@angular/core';
import { Password } from "primeng/password";
import { FloatLabel } from "primeng/floatlabel";
import { Button } from "primeng/button";
import { Message } from "primeng/message";
import { DatePicker } from "primeng/datepicker";
import { UserFormModel } from '@features/auth/models/user-form-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

type UserFormMode = 'create' | 'edit';

@Component({
  selector: 'app-save-user-form',
  imports: [CommonModule, FormsModule, Password, FloatLabel, Button, Message, DatePicker, InputTextModule],
  templateUrl: './save-user-form.component.html',
  styleUrl: './save-user-form.component.scss'
})
export class SaveUserFormComponent {
  today: Date = new Date();

  @Input() mode: UserFormMode = 'create';

  form: UserFormModel = this.createEmptyForm();

  errorMessage: string | undefined;

  save() {
    throw new Error('Method not implemented.');
  }

  createEmptyForm(): UserFormModel {
    return {
      name: '',
      username: '',
      email: '',
      birthDate: null,
      password: '',
      repeatedPassword: ''
    };
  }
}
