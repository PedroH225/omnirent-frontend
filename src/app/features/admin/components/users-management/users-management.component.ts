import { Component, OnInit } from '@angular/core';
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
  ],
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

  readonly statusOptions = [
    { label: 'Todos', value: null },
    { label: 'Ativos', value: UserStatus.ACTIVE },
    { label: 'Inativos', value: UserStatus.INACTIVE },
    { label: 'Banidos', value: UserStatus.BANNED },
  ];

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
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
        this.loading = false;
      },

      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
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
    // chamada para banir/desbanir
  }

  getActionLabel(user: UserSummary): string {
    return user.userStatus === UserStatus.BANNED ? 'Desbanir' : 'Banir';
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
