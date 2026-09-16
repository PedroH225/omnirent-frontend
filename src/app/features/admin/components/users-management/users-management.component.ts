import { Component, effect, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { TableModule, TablePageEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';

import { UserService } from '@core/user/user.service';
import { UserSummary } from '@core/user/model/user-summary-model';
import { PageResponse } from '@shared/models/page.response.model';
import { TranslationService } from '@core/i18n/translation.service';
import { LocaleService } from '@core/i18n/locale.service';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LoggedUserModel } from '@core/user/model/logged-user-model';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BANNED = 'BANNED',
}

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    TagModule,
    TranslatePipe,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss',
})
export class UsersManagementComponent implements OnInit {
  loading = true;

  page!: number;
  size!: number;
  totalElements!: number;

  username = '';
  status: string | null = null;

  users: UserSummary[] = [];

  private userStatusCodes: string[] = [];
  statusOptions: { label: string; value: string | null }[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly translationService: TranslationService,
    private readonly localeService: LocaleService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
  ) {
    effect(() => {
      this.localeService.locale();

      this.mapStatusOptions();
    });
  }

  ngOnInit(): void {
    this.loadEnums();

    this.route.queryParams.subscribe((params) => {
      if (params['page'] == null || params['size'] == null) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page: 0,
            size: 10,
          },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });

        return;
      }

      this.page = Number(params['page'] ?? 0);
      this.size = Number(params['size'] ?? 10);

      this.username = params['username'] ?? '';
      this.status = params['status'] ?? null;

      this.getUsers(
        this.username || undefined,
        this.status || undefined,
        this.page,
        this.size,
      );
    });
  }

  getUsers(
    username: string | undefined,
    status: string | undefined,
    page: number,
    size: number,
  ): void {
    this.loading = true;

    this.userService.searchUsers(username, status, page, size).subscribe({
      next: (response: PageResponse<UserSummary>) => {
        this.users = response.content;
        this.totalElements = response.totalElements;
        this.removeCurrentUser();

        this.loading = false;
      },

      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }

  private loadEnums(): void {
    this.userService.getEnums().subscribe({
      next: (response) => {
        this.userStatusCodes = response.userStatuses.map(
          (status) => status.code,
        );

        this.mapStatusOptions();
      },
    });
  }

  private mapStatusOptions(): void {
    this.statusOptions = [
      {
        label: this.translationService.translate('common.all'),
        value: null,
      },
      ...this.userStatusCodes.map((code) => ({
        label: this.translationService.translate(
          `enums.userStatus.${code.toLowerCase()}`,
        ),
        value: code,
      })),
    ];
  }

  search(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        username: this.username || null,
        status: this.status || null,
        page: 0,
        size: this.size,
      },
      queryParamsHandling: 'merge',
    });
  }

  clearFilters(): void {
    this.username = '';
    this.status = null;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        username: null,
        status: null,
        page: 0,
        size: this.size,
      },
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(event: TablePageEvent): void {
    const page = Math.floor((event.first ?? 0) / (event.rows ?? this.size));

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page,
        size: event.rows,
      },
      queryParamsHandling: 'merge',
    });
  }

  toggleBan(user: UserSummary): void {
    const isBanned = user.userStatus === 'BANNED';

    this.confirmationService.confirm({
      header: this.translationService.translate(
        isBanned
          ? 'admin.usersManagement.confirmUnban.title'
          : 'admin.usersManagement.confirmBan.title',
      ),

      message: this.translationService.translate(
        isBanned
          ? 'admin.usersManagement.confirmUnban.message'
          : 'admin.usersManagement.confirmBan.message',
        { username: user.username },
      ),

      icon: 'pi pi-exclamation-triangle',

      acceptLabel: this.translationService.translate(
        isBanned ? 'admin.usersManagement.unban' : 'admin.usersManagement.ban',
      ),

      rejectLabel: this.translationService.translate('common.cancel'),

      acceptButtonStyleClass: isBanned ? 'p-button-success' : 'p-button-danger',

      rejectButtonStyleClass: 'p-button-secondary p-button-outlined',

      accept: () => {
        this.executeToggleBan(user, isBanned);
      },
    });
  }

  private executeToggleBan(user: UserSummary, wasBanned: boolean): void {
    this.userService.toggleUserBan(user.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: this.translationService.translate('common.messages.success'),
          detail: this.translationService.translate(
            wasBanned
              ? 'admin.usersManagement.unbanSuccess'
              : 'admin.usersManagement.banSuccess',
            { username: user.username },
          ),
        });

        this.users = this.users.filter(
          (currentUser) => currentUser.id !== user.id,
        );

        this.totalElements--;
      },

      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: this.translationService.translate('common.messages.error'),
          detail: this.translationService.translate(
            'admin.usersManagement.statusChangeError',
          ),
        });
      },
    });
  }

  private removeCurrentUser() {
    const currentUserId = this.userService.currentUser()?.id;

    this.users = this.users.filter((user) => user.id !== currentUserId);
  }

  getActionIcon(user: UserSummary): string {
    return user.userStatus === UserStatus.BANNED ? 'pi pi-check' : 'pi pi-ban';
  }

  getStatusSeverity(status: UserStatus): 'success' | 'secondary' | 'danger' {
    switch (status) {
      case UserStatus.ACTIVE:
        return 'success';

      case UserStatus.INACTIVE:
        return 'secondary';

      case UserStatus.BANNED:
        return 'danger';
    }
  }
}
