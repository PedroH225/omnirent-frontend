import { Component } from '@angular/core';
import { ItemService } from '@core/item/item.service';
import { ItemDisplay } from '@core/item/model/item-display-model';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { DataViewModule, DataViewPageEvent } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { ItemManagementListComponent } from '@features/items/components/item-management-list/item-management-list.component';
import { ItemManagementCardComponent } from '@features/items/components/item-management-card/item-management-card.component';
import { PageResponse } from '@shared/models/page.response.model';
import { TranslatePipe } from '@core/i18n/translation-pipe';

@Component({
  selector: 'app-my-items.component',
  imports: [
    CommonModule,
    SelectButtonModule,
    DataViewModule,
    FormsModule,
    ItemManagementListComponent,
    ItemManagementCardComponent,
    TranslatePipe
  ],
  templateUrl: './my-items.component.html',
  styleUrl: './my-items.component.scss',
})
export class MyItemsComponent {
  page!: number;
  size!: number;
  totalElements!: number;

  layout: 'grid' | 'list' = 'grid';

  options = [
    { label: 'Grid', value: 'grid' },
    { label: 'List', value: 'list' },
  ];

  storageUrl = environment.storageUrl;

  items: ItemDisplay[] = [];

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['page'] == null || params['size'] == null) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page: 0,
            size: 20,
          },
          replaceUrl: true,
        });
        return;
      }

      this.page = Number(params['page'] ?? 0);
      this.size = Number(params['size'] ?? 20);

      this.getUserItems(this.page, this.size);
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

  getUserItems(page: number, size: number): void {
    this.itemService.getUserItems(page, size).subscribe({
      next: (response: PageResponse<ItemDisplay>) => {
        this.totalElements = response.totalElements;
        this.items = response.content.map((item) => ({
          ...item,
          thumbnailKey: item.thumbnailKey
            ? `${this.storageUrl}/${item.thumbnailKey}`
            : null,
        }));
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
