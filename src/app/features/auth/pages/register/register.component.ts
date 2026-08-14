import { Component } from '@angular/core';
import { Card } from "primeng/card";
import { DatePickerModule } from 'primeng/datepicker';
import { SaveUserFormComponent } from "@features/auth/components/save-user-form/save-user-form.component";
import { Router, RouterLink } from '@angular/router';
import { UserFormModel } from '@features/auth/models/user-form-model';
import { RegisterDto } from '@features/auth/models/register-model';
import { FieldError } from '@shared/models/field-error';
import { AuthService } from '@core/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiValidationException } from '@shared/models/api-field-exception';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  imports: [Card, DatePickerModule, SaveUserFormComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  backendErrors: FieldError[] = [];

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }

  register(userForm: UserFormModel) {
    const register: RegisterDto = this.toRegisterDto(userForm);

    this.authService.registerUser(register).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You were registered successfully.'
        });
        this.router.navigateByUrl("/auth/login");
      },
      error: (error: HttpErrorResponse) => {
        const apiError = error.error as ApiValidationException;

        if (apiError?.errorCode === 'VALIDATION_ERROR') {
          this.backendErrors = apiError.fields;

          this.messageService.add({
            severity: 'error',
            summary: 'Validation failed',
            detail: 'Please review the highlighted fields and try again.'
          });

          return;
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Unknown Error',
          detail: 'Unknown error while trying to register. Try again later.'
        });
      }
    })
  }

  private toRegisterDto(userForm: UserFormModel): RegisterDto {
    return {
      name: userForm.name,
      username: userForm.username,
      email: userForm.email,
      birthDate: userForm?.birthDate,
      password: userForm.password,
      repeatedPassword: userForm.repeatedPassword
    };
  }
}
