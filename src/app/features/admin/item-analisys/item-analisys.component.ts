import { Component, effect, OnInit } from '@angular/core';
import { ItemAnalisysModel } from '@core/item/model/item-analisys-model';
import { environment } from '../../../../environments/environment';
import { ItemService } from '@core/item/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from '@core/i18n/translation.service';
import { LocaleService } from '@core/i18n/locale.service';
import { PageResponse } from '@shared/models/page.response.model';
import { DataViewModule, DataViewPageEvent } from 'primeng/dataview';
import { Button, ButtonModule } from 'primeng/button';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ItemImageModel } from '@core/item/model/Item-image-model';
import { GalleriaModule } from 'primeng/galleria';
import { forkJoin } from 'rxjs';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-item-analisys',
  imports: [
    Button,
    CommonModule,
    DataViewModule,
    ButtonModule,
    TagModule,
    TranslatePipe,
    GalleriaModule,
    Select,
    FormsModule,
    ToastModule,
    ConfirmDialog
],
  providers: [MessageService, ConfirmationService],
  templateUrl: './item-analisys.component.html',
  styleUrl: './item-analisys.component.scss',
})
export class ItemAnalisysComponent implements OnInit {
  loading = true;

  page!: number;
  size!: number;
  totalElements!: number;

  items: ItemAnalisysModel[] = [];

  storageUrl = environment.storageUrl;

  conditionLabels: Record<string, string> = {};
  statusLabels: Record<string, string> = {};

  activeIndex = 0;
  galleryVisible = false;
  selectedImages: ItemImageModel[] = [];
  readonly defaultImage = 'assets/placeholder-img.png';

  private itemConditionCodes: string[] = [];
  private itemStatusCodes: string[] = [];
  private rejectionReasonCodes: string[] = [];

  rejectionReasonOptions: {
    code: string;
    label: string;
    description: string;
  }[] = [];
  selectedRejectionReasons: Record<
    string,
    {
      code: string;
      label: string;
      description: string;
    } | null
  > = {};

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

      this.mapEnumLabels();
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

      this.page = Number(params['page']);
      this.size = Number(params['size']);

      this.getItems(this.page, this.size);
    });
  }

  private loadEnums(): void {
    forkJoin({
      enums: this.itemService.getItemEnums(),
      rejectReasons: this.itemService.getItemRejectReasons(),
    }).subscribe({
      next: ({ enums, rejectReasons }) => {
        this.itemConditionCodes = enums.itemConditions.map(
          (condition) => condition.code,
        );

        this.itemStatusCodes = enums.itemStatuses.map((status) => status.code);

        this.rejectionReasonCodes = rejectReasons.map((reason) => reason.code);

        this.mapEnumLabels();
      },
    });
  }

  private mapEnumLabels(): void {
    this.conditionLabels = Object.fromEntries(
      this.itemConditionCodes.map((code) => [
        code,
        this.translationService.translate(
          `enums.itemCondition.${code.toLowerCase()}`,
        ),
      ]),
    );

    this.statusLabels = Object.fromEntries(
      this.itemStatusCodes.map((code) => [
        code,
        this.translationService.translate(
          `enums.itemStatus.${code.toLowerCase()}`,
        ),
      ]),
    );

    this.rejectionReasonOptions = this.rejectionReasonCodes.map((code) => ({
      code,
      label: this.translationService.translate(
        `enums.itemRejectionReasons.${code.toLowerCase()}.label`,
      ),
      description: this.translationService.translate(
        `enums.itemRejectionReasons.${code.toLowerCase()}.description`,
      ),
    }));
  }

  getItems(page: number, size: number): void {
    this.loading = true;

    this.itemService.getUnderAnalisys(page, size).subscribe({
      next: (response: PageResponse<ItemAnalisysModel>) => {
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

  onPageChange(event: DataViewPageEvent): void {
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

  getImageUrl(item: ItemAnalisysModel): string {
    const image = item.images
      .slice()
      .sort((a, b) => a.displayOrder - b.displayOrder)[0];

    return image ? `${this.storageUrl}/${image.storageKey}` : this.defaultImage;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;

    if (img.src.endsWith(this.defaultImage)) {
      return;
    }

    img.src = this.defaultImage;
  }

  getConditionLabel(condition: string): string {
    return this.conditionLabels[condition] ?? condition;
  }

  getStatusLabel(status: string): string {
    return this.statusLabels[status] ?? status;
  }

  openGallery(item: ItemAnalisysModel): void {
    if (!item.images?.length) {
      return;
    }

    this.selectedImages = [...item.images].sort(
      (a, b) => a.displayOrder - b.displayOrder,
    );

    this.activeIndex = 0;
    this.galleryVisible = true;
  }

  getImageStorageUrl(storageKey?: string | null): string {
    return storageKey ? `${this.storageUrl}/${storageKey}` : this.defaultImage;
  }

  private executeApprove(item: ItemAnalisysModel): void {
    this.itemService.approveItem(item.id).subscribe({
      next: () => {
        this.items = this.items.filter(
          (currentItem) => currentItem.id !== item.id,
        );

        this.totalElements--;

        this.messageService.add({
          severity: 'success',
          summary: this.translationService.translate('common.messages.success'),
          detail: this.translationService.translate(
            'admin.itemsReview.approveSuccess',
            { item: item.name },
          ),
        });
      },
    });
  }

  approveItem(item: ItemAnalisysModel): void {
    this.confirmationService.confirm({
      header: this.translationService.translate(
        'admin.itemsReview.confirmApprove.title',
      ),
      message: this.translationService.translate(
        'admin.itemsReview.confirmApprove.message',
        { item: item.name },
      ),
      icon: 'pi pi-check-circle',

      acceptLabel: this.translationService.translate(
        'admin.itemsReview.approve',
      ),
      rejectLabel: this.translationService.translate('common.cancel'),

      acceptButtonProps: {
        severity: 'success',
      },

      rejectButtonProps: {
        severity: 'secondary',
        outlined: true,
      },

      accept: () => {
        this.executeApprove(item);
      },
    });
  }

  rejectItem(item: ItemAnalisysModel): void {
    // chamada de rejeição/bloqueio
  }
}
