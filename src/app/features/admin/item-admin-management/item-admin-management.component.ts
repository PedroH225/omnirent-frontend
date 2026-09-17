import { Component, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TableModule, TablePageEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ItemService } from '@core/item/item.service';
import { ItemDisplay } from '@core/item/model/item-display-model';
import { PageResponse } from '@shared/models/page.response.model';
import { TranslationService } from '@core/i18n/translation.service';
import { LocaleService } from '@core/i18n/locale.service';
import { TranslatePipe } from '@core/i18n/translation-pipe';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-item-admin-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    TagModule,
    ToastModule,
    ConfirmDialogModule,
    TranslatePipe,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './item-admin-management.component.html',
  styleUrl: './item-admin-management.component.scss',
})
export class ItemAdminManagementComponent implements OnInit {
  loading = true;

  page!: number;
  size!: number;
  totalElements!: number;

  name = '';
  status: string | null = null;

  items: ItemDisplay[] = [];

  readonly storageUrl = environment.storageUrl;
  readonly defaultImage = 'assets/placeholder-img.png';

  private itemStatusCodes: string[] = [];

  statusOptions: {
    label: string;
    value: string | null;
  }[] = [];

  constructor(
    private readonly itemService: ItemService,
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

      this.name = params['name'] ?? '';
      this.status = params['status'] ?? null;

      this.getItems(
        this.name || undefined,
        this.status || undefined,
        this.page,
        this.size,
      );
    });
  }

  private loadEnums(): void {
    this.itemService.getItemEnums().subscribe({
      next: (response) => {
        this.itemStatusCodes = response.itemStatuses.map(
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

      ...this.itemStatusCodes.map((code) => ({
        label: this.translationService.translate(
          `enums.itemStatus.${code.toLowerCase()}`,
        ),
        value: code,
      })),
    ];
  }

  getItems(
    name: string | undefined,
    status: string | undefined,
    page: number,
    size: number,
  ): void {
    this.loading = true;

    this.itemService.searchItems(name, status, page, size).subscribe({
      next: (response: PageResponse<ItemDisplay>) => {
        this.items = response.content;
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
        name: this.name || null,
        status: this.status || null,
        page: 0,
        size: this.size,
      },
      queryParamsHandling: 'merge',
    });
  }

  clearFilters(): void {
    this.name = '';
    this.status = null;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        name: null,
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

  toggleBlock(item: ItemDisplay): void {
    const isBlocked = item.itemStatus === 'BLOCKED';

    this.confirmationService.confirm({
      header: this.translationService.translate(
        isBlocked
          ? 'admin.itemsManagement.confirmUnblock.title'
          : 'admin.itemsManagement.confirmBlock.title',
      ),

      message: this.translationService.translate(
        isBlocked
          ? 'admin.itemsManagement.confirmUnblock.message'
          : 'admin.itemsManagement.confirmBlock.message',
        {
          item: item.name,
        },
      ),

      icon: 'pi pi-exclamation-triangle',

      acceptLabel: this.translationService.translate(
        isBlocked
          ? 'admin.itemsManagement.unblock'
          : 'admin.itemsManagement.block',
      ),

      rejectLabel: this.translationService.translate('common.cancel'),

      acceptButtonStyleClass: isBlocked
        ? 'p-button-success'
        : 'p-button-danger',

      rejectButtonStyleClass: 'p-button-secondary p-button-outlined',

      accept: () => {
        this.executeToggleBlock(item, isBlocked);
      },
    });
  }

  private executeToggleBlock(item: ItemDisplay, wasBlocked: boolean): void {
    this.itemService.toggleItemBlocking(item.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',

          summary: this.translationService.translate('common.messages.success'),

          detail: this.translationService.translate(
            wasBlocked
              ? 'admin.itemsManagement.unblockSuccess'
              : 'admin.itemsManagement.blockSuccess',
            {
              item: item.name,
            },
          ),
        });

        this.items = this.items.map((currentItem) =>
          currentItem.id === item.id
            ? {
                ...currentItem,
                itemStatus: wasBlocked ? 'UNAVAILABLE' : 'BLOCKED',
              }
            : currentItem,
        );
      },

      error: () => {
        this.messageService.add({
          severity: 'error',

          summary: this.translationService.translate('common.messages.error'),

          detail: this.translationService.translate(
            'admin.itemsManagement.statusChangeError',
          ),
        });
      },
    });
  }

  getThumbnailUrl(item: ItemDisplay): string {
    return item.thumbnailKey
      ? `${this.storageUrl}/${item.thumbnailKey}`
      : this.defaultImage;
  }

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    if (image.src.endsWith(this.defaultImage)) {
      return;
    }

    image.src = this.defaultImage;
  }

  getStatusLabel(status: string): string {
    return this.translationService.translate(
      `enums.itemStatus.${status.toLowerCase()}`,
    );
  }

  getConditionLabel(condition: string): string {
    return this.translationService.translate(
      `enums.itemCondition.${condition.toLowerCase()}`,
    );
  }

  getActionIcon(item: ItemDisplay): string {
    return item.itemStatus === 'BLOCKED' ? 'pi pi-lock-open' : 'pi pi-ban';
  }

  getStatusSeverity(
    status: string,
  ): 'success' | 'secondary' | 'warn' | 'danger' | 'info' {
    switch (status) {
      case 'AVAILABLE':
        return 'success';

      case 'RENTED':
        return 'info';

      case 'ANALISYS':
        return 'warn';

      case 'BLOCKED':
        return 'danger';

      case 'UNAVAILABLE':
      default:
        return 'secondary';
    }
  }
}
