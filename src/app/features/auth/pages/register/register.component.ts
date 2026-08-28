import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { SaveUserFormComponent } from '@features/auth/components/save-user-form/save-user-form.component';
import { Router, RouterLink } from '@angular/router';
import { UserFormModel } from '@features/auth/models/user-form-model';
import { RegisterDto } from '@features/auth/models/register-model';
import { FieldError } from '@shared/models/field-error';
import { AuthService } from '@core/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiValidationException } from '@shared/models/api-field-exception';
import { MessageService } from 'primeng/api';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';

@Component({
  selector: 'app-register',
  imports: [
    Card,
    DatePickerModule,
    SaveUserFormComponent,
    RouterLink,
    TranslatePipe,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  backendErrors: FieldError[] = [];

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private translationService: TranslationService,
  ) {}

  register(userForm: UserFormModel) {
    const register: RegisterDto = this.toRegisterDto(userForm);

    this.authService.registerUser(register).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: this.translationService.translate(
            'auth.register.messages.success.title',
          ),
          detail: this.translationService.translate(
            'auth.register.messages.success.message',
          ),
        });

        this.router.navigateByUrl('/auth/login');
      },

      error: (error: HttpErrorResponse) => {
        const apiError = error.error as ApiValidationException;

        if (apiError?.errorCode === 'VALIDATION_ERROR') {
          this.backendErrors = apiError.fields;

          this.showValidationErrorMessage();

          return;
        }

        this.messageService.add({
          severity: 'error',
          summary: this.translationService.translate(
            'auth.register.messages.error.title',
          ),
          detail: this.translationService.translate(
            'auth.register.messages.error.message',
          ),
        });
      },
    });
  }

  showValidationErrorMessage(): void {
    this.messageService.add({
      severity: 'error',
      summary: this.translationService.translate(
        'common.messages.validationError.title',
      ),
      detail: this.translationService.translate(
        'common.messages.validationError.message',
      ),
    });
  }

  private toRegisterDto(userForm: UserFormModel): RegisterDto {
    return {
      name: userForm.name,
      username: userForm.username,
      email: userForm.email,
      birthDate: userForm?.birthDate,
      password: userForm.password,
      repeatedPassword: userForm.repeatedPassword,
    };
  }
}
