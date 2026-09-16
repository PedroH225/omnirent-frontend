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

@Component({
  selector: 'app-item-analisys',
  imports: [
    Button,
    CommonModule,
    DataViewModule,
    ButtonModule,
    TagModule,
    TranslatePipe,
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

  private itemConditionCodes: string[] = [];
  private itemStatusCodes: string[] = [];

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
            size: 20,
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
    this.itemService.getItemEnums().subscribe({
      next: (response) => {
        this.itemConditionCodes = response.itemConditions.map(
          (condition) => condition.code,
        );

        this.itemStatusCodes = response.itemStatuses.map(
          (status) => status.code,
        );

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

  getImageUrl(item: ItemAnalisysModel): string | null {
    const image = item.images
      .slice()
      .sort((a, b) => a.displayOrder - b.displayOrder)[0];

    return image ? `${this.storageUrl}/${image.storageKey}` : null;
  }

  getConditionLabel(condition: string): string {
    return this.conditionLabels[condition] ?? condition;
  }

  getStatusLabel(status: string): string {
    return this.statusLabels[status] ?? status;
  }

  approveItem(item: ItemAnalisysModel): void {
    // chamada de aprovação
  }

  rejectItem(item: ItemAnalisysModel): void {
    // chamada de rejeição/bloqueio
  }
}
