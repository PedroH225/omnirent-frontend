import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Password } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { Button } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { UserFormModel } from '@features/auth/models/user-form-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FieldError } from '@shared/models/field-error';
import { FieldErrorComponent } from '@shared/components/field-error/field-error.component';
import { SaveUserFormValidator } from '@features/auth/validators/user-form-validator';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';
import { UserDetail } from '@core/user/model/user-detail-model';

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
    FieldErrorComponent,
    TranslatePipe,
  ],
  templateUrl: './save-user-form.component.html',
  styleUrl: './save-user-form.component.scss',
})
export class SaveUserFormComponent implements OnChanges {
  today: Date = new Date();

  @Input() mode: UserFormMode = 'create';
  @Input() user: UserDetail | null = null;
  @Input() backendErrors: FieldError[] = [];

  @Output() onSave = new EventEmitter<UserFormModel>();
  @Output() formChange = new EventEmitter<UserFormModel>();
  @Output() validationError = new EventEmitter<void>();

  form: UserFormModel = this.createEmptyForm();

  localErrors: FieldError[] = [];

  constructor(private readonly translationService: TranslationService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.mode === 'edit' &&
      this.user &&
      (changes['user'] || changes['mode'])
    ) {
      this.form = this.createEditForm(this.user);
    }
  }

  save(): void {
    this.localErrors = SaveUserFormValidator.validate(this.form, this.mode);

    if (this.localErrors.length > 0) {
      console.table(this.localErrors);

      this.validationError.emit();
      return;
    }

    this.onSave.emit(this.form);
  }

  getFieldError(field: string): string | undefined {
    const localError = this.localErrors.find((error) => error.field === field);

    if (localError) {
      return this.translationService.translate(localError.message);
    }

    return this.backendErrors.find((error) => error.field === field)?.message;
  }

  onFieldChange(field: string): void {
    this.localErrors = this.localErrors.filter(
      (error) => error.field !== field,
    );

    this.backendErrors = this.backendErrors.filter(
      (error) => error.field !== field,
    );

    this.formChange.emit(this.form);
  }

  resetForm() {
    this.localErrors = [];

    if (this.user && this.mode === 'edit') {
      this.form = this.createEditForm(this.user);
    } else {
      this.form = this.createEmptyForm();
    }
  }

  private createEditForm(user: UserDetail): UserFormModel {
    return {
      name: user.name,
      username: user.username,
      email: user.email,
      birthDate: user.birthDate ? new Date(user.birthDate) : null,
      password: '',
      repeatedPassword: '',
    };
  }

  private createEmptyForm(): UserFormModel {
    return {
      name: '',
      username: '',
      email: '',
      birthDate: null,
      password: '',
      repeatedPassword: '',
    };
  }
}
