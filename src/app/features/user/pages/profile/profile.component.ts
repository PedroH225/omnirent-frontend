import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '@core/user/user.service';
import { UserDetail } from '@core/user/model/user-detail-model';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';
import { Dialog } from 'primeng/dialog';
import { SaveUserFormComponent } from '@features/auth/components/save-user-form/save-user-form.component';
import { UserFormModel } from '@features/auth/models/user-form-model';
import { Button } from 'primeng/button';
import { UpdateItemRequestModel } from '@features/items/model/item-update-request-model';
import { UpdateUserRequest } from '@core/user/model/update-user-model';
import { FieldError } from '@shared/models/field-error';
import { ApiValidationException } from '@shared/models/api-field-exception';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, TranslatePipe, Dialog, SaveUserFormComponent, Button],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  @ViewChild(SaveUserFormComponent)
  saveUserForm?: SaveUserFormComponent;

  user = signal<UserDetail | null>(null);
  editDialogVisible = signal(false);
  backendErrors: FieldError[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly translationService: TranslationService,
    private readonly messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  onUserUpdated(user: UserFormModel): void {
    const currentUser = this.user();

    if (!currentUser) {
      this.closeEditDialog();

      return;
    }

    const updateRequest: UpdateUserRequest = {
      name: user.name,
      username: user.username,
      email: user.email,
      birthDate: user.birthDate,
    };

    if (!this.hasUserChanges(currentUser, updateRequest)) {
      this.closeEditDialog();
      return;
    }

    this.userService.updateUser(updateRequest).subscribe({
      next: (updated) => {
        this.user.set(updated);

        this.messageService.add({
          severity: 'success',
          summary: this.translationService.translate(
            'account.profile.messages.updated.title',
          ),
          detail: this.translationService.translate(
            'account.profile.messages.updated.message',
          ),
        });

        this.closeEditDialog();
      },
      error: (error) => {
        const apiError = error.error as ApiValidationException;

        if (apiError?.errorCode === 'VALIDATION_ERROR') {
          this.backendErrors = apiError.fields;

          this.showValidationErrorMessage();

          return;
        }
      },
    });
  }

  private loadUser(): void {
    this.userService.findById().subscribe({
      next: (user) => {
        this.user.set(user);
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

  getStatusLabel(status: string): string {
    return this.translationService.translate(
      `account.profile.status.${status}`,
    );
  }

  openEditDialog(): void {
    this.editDialogVisible.set(true);
  }

  closeEditDialog(): void {
    this.editDialogVisible.set(false);
    this.backendErrors = [];

    this.saveUserForm?.resetForm();
  }

  private hasUserChanges(
    currentUser: UserDetail,
    updateRequest: UpdateUserRequest,
  ): boolean {
    return (
      updateRequest.name !== currentUser.name ||
      updateRequest.username !== currentUser.username ||
      updateRequest.email !== currentUser.email ||
      this.normalizeDate(updateRequest.birthDate) !==
        this.normalizeDate(currentUser.birthDate)
    );
  }

  private normalizeDate(date: Date | string | null): string | null {
    if (!date) {
      return null;
    }

    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }

    return date;
  }
}
