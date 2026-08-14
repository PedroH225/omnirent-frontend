import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Password } from "primeng/password";
import { FloatLabel } from "primeng/floatlabel";
import { Button } from "primeng/button";
import { Message } from "primeng/message";
import { DatePicker } from "primeng/datepicker";
import { UserFormModel } from '@features/auth/models/user-form-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FieldError } from '@shared/models/field-error';
import { FieldErrorComponent } from "@shared/components/field-error/field-error.component";

type UserFormMode = 'create' | 'edit';

@Component({
  selector: 'app-save-user-form',
  imports: [CommonModule, FormsModule, Password, FloatLabel, Button, DatePicker, InputTextModule, FieldErrorComponent],
  templateUrl: './save-user-form.component.html',
  styleUrl: './save-user-form.component.scss'
})
export class SaveUserFormComponent {
  today: Date = new Date();

  @Input() mode: UserFormMode = 'create';
  @Input() backendErrors: FieldError[] = [];
  //@Input() user: user;

  @Output() onSave = new EventEmitter<UserFormModel>()
  @Output() formChange = new EventEmitter<UserFormModel>();

  form: UserFormModel = this.createEmptyForm();

  save() {
    this.onSave.emit(this.form);
  }

  getFieldError(field: string): string | undefined {
    return this.backendErrors.find(
      error => error.field === field
    )?.message;
  }

  onFieldChange(field: string): void {
    this.backendErrors = this.backendErrors.filter(
      error => error.field !== field
    );

    this.formChange.emit(this.form);
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
