import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Password } from "primeng/password";
import { FloatLabel } from "primeng/floatlabel";
import { Button } from "primeng/button";
import { DatePicker } from "primeng/datepicker";
import { UserFormModel } from '@features/auth/models/user-form-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FieldError } from '@shared/models/field-error';
import { FieldErrorComponent } from "@shared/components/field-error/field-error.component";
import { SaveUserFormValidator } from '@features/auth/validators/user-form-validator';

type UserFormMode = 'create' | 'edit';

@Component({
  selector: 'app-save-user-form',
  imports: [
    CommonModule,
    FormsModule,
    Password,
    FloatLabel,
    Button,
    DatePicker,
    InputTextModule,
    FieldErrorComponent
  ],
  templateUrl: './save-user-form.component.html',
  styleUrl: './save-user-form.component.scss'
})
export class SaveUserFormComponent {

  today: Date = new Date();

  @Input() mode: UserFormMode = 'create';
  @Input() backendErrors: FieldError[] = [];

  @Output() onSave = new EventEmitter<UserFormModel>();
  @Output() formChange = new EventEmitter<UserFormModel>();

  form: UserFormModel = this.createEmptyForm();

  localErrors: FieldError[] = [];

  save(): void {
    this.localErrors = SaveUserFormValidator.validate(this.form);

    if (this.localErrors.length > 0) {
      return;
    }

    this.onSave.emit(this.form);
  }

  getFieldError(field: string): string | undefined {
    return this.localErrors.find(
      error => error.field === field
    )?.message
      ?? this.backendErrors.find(
        error => error.field === field
      )?.message;
  }

  onFieldChange(field: string): void {
    this.localErrors = this.localErrors.filter(
      error => error.field !== field
    );

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