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
import { EnumOption } from '@shared/models/EnumOption';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';

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
  ],
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

  rejectionReasonOptions: EnumOption[] = [];
  selectedRejectionReasons: Record<string, EnumOption | null> = {};

  constructor(
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly translationService: TranslationService,
    private readonly localeService: LocaleService,
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

        this.rejectionReasonOptions = rejectReasons;

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

    this.rejectionReasonOptions = this.rejectionReasonOptions.map((reason) => ({
      ...reason,
      label: this.translationService.translate(
        `enums.itemRejectionReasons.${reason.code.toLowerCase()}`,
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

  approveItem(item: ItemAnalisysModel): void {
    // chamada de aprovação
  }

  rejectItem(item: ItemAnalisysModel): void {
    // chamada de rejeição/bloqueio
  }
}
