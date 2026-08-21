import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '@core/item/item.service';
import { ItemFeed } from '@core/item/model/item-feed-model';
import { ItemFeedCardComponent } from "@shared/components/item-feed-card/item-feed-card.component";
import { ItemFeedListComponent } from "@shared/components/item-feed-list/item-feed-list.component";
import { PageResponse } from '@shared/models/page.response.model';
import { DataView } from "primeng/dataview";
import { SelectButton } from "primeng/selectbutton";
import { Button } from "primeng/button";
import { SelectOption } from '@shared/models/select-option';
import { SubCategoryResponse } from '@core/categories/model/subcategory.model';
import { EnumOption } from '@shared/models/EnumOption';
import { CategoryResponse } from '@core/categories/model/category.model';
import { Select } from "primeng/select";
import { CategoryService } from '@core/categories/category.service';
import { ITEM_FEED_SORTS } from '@shared/models/item-feed-sort';
import { FeedFilterStateService } from '@core/feed/feed-filter-state.service';
import { environment } from '../../../../../environments/environment';
import { ItemFeedCardModel } from '@shared/models/item-card-model';
import { ItemFeedCardSkeletonComponent } from "@shared/components/item-feed-card-skeleton/item-feed-card-skeleton.component";
import { delay } from 'rxjs';
import { ItemFeedListSkeletonComponent } from "@shared/components/item-feed-list-skeleton/item-feed-list-skeleton.component";

@Component({
  selector: 'app-item-feed',
  imports: [
    ItemFeedCardComponent, ItemFeedListComponent, DataView,
    CommonModule, FormsModule, SelectButton,
    Button,
    Select,
    ItemFeedCardSkeletonComponent,
    ItemFeedListSkeletonComponent
  ],
  templateUrl: './item-feed.component.html',
  styleUrl: './item-feed.component.scss'
})
export class ItemFeedComponent implements OnInit {
  items: ItemFeedCardModel[] = [];

  storageUrl = environment.storageUrl;

  filtersOpen = false;
  loading = true;

  layout: 'grid' | 'list' = 'grid';

  options = [
    {
      label: 'Grid',
      value: 'grid'
    },
    {
      label: 'List',
      value: 'list'
    }
  ];

  page = 0;
  size = 20;
  totalElements = 0;

  name: string | null = null;
  category: string | null = null;
  subCategory: string | null = null;
  itemCondition: string | null = null;
  sort: string | null = null;

  categories: SelectOption<CategoryResponse>[] = [];
  subCategories: SelectOption<SubCategoryResponse>[] = [];
  itemConditions: SelectOption<EnumOption>[] = [];
  sorts: SelectOption<string>[] = [];

  selectedCategory?: CategoryResponse;
  selectedSubCategory?: SubCategoryResponse;
  selectedCondition?: EnumOption;
  selectedSort?: string;

  constructor(
    private readonly itemService: ItemService,
    private readonly categoryService: CategoryService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly filterState: FeedFilterStateService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      this.name = params['name'] || null;
      this.category = params['category'] || null;
      this.subCategory = params['subCategory'] || null;
      this.itemCondition = params['itemCondition'] || null;
      this.sort = params['sort'] || null;

      this.page = Math.max(0, Number(params['page'] ?? 0));
      this.size = Math.max(1, Number(params['size'] ?? 20));

      this.filterState.setFilters({
        title: this.name,
        category: this.category,
        subCategory: this.subCategory,
        condition: this.itemCondition,
        sort: this.sort
      });

      this.loadItems();
    });

    this.loadCategories();
    this.loadItemEnums();
    this.loadSorts();
  }

  ngOnDestroy(): void {
    this.filterState.reset();
  }

  loadItems(): void {
    this.loading = true;

    this.itemService.getItemFeed(
      this.name, this.category, this.subCategory,
      this.itemCondition, this.sort,
      this.page, this.size)
//      .pipe(delay(3000))
      .subscribe({
        next: (response: PageResponse<ItemFeed>) => {
          this.items = response.content.map(item => this.mapItem(item));
          this.totalElements = response.totalElements;
          this.loading = false;
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this.loading = false;
        }
      });
  }

  loadCategories(): void {
    this.categoryService.getCategoriesWithSub().subscribe({
      next: (response) => {

        this.categories = response.map(category => ({
          label: category.categoryLabel,
          value: category
        }));

        this.selectedCategory = this.categories
          .find(option => option.value.name === this.category)
          ?.value;

        if (this.selectedCategory) {

          this.subCategories = this.selectedCategory.subCategories.map(sub => ({
            label: sub.subCategoryLabel,
            value: sub
          }));

          this.selectedSubCategory = this.subCategories
            .find(option => option.value.name === this.subCategory)
            ?.value;
        }

      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  loadItemEnums(): void {
    this.itemService.getItemEnums().subscribe({
      next: (response) => {

        this.itemConditions = response.itemConditions.map(condition => ({
          label: condition.label,
          value: condition
        }));

        this.selectedCondition = this.itemConditions
          .find(option => option.value.code === this.itemCondition)
          ?.value;

      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  loadSorts(): void {
    this.sorts = ITEM_FEED_SORTS.map(sort => ({
      label: sort.label,
      value: sort.code
    }));

    this.selectedSort = this.sorts
      .find(option => option.value === this.sort)
      ?.value;
  }

  onCategoryChange(): void {
    this.selectedSubCategory = undefined;
    this.subCategories = this.selectedCategory?.subCategories.map(sub => ({
      label: sub.subCategoryLabel,
      value: sub
    })) ?? [];

    this.filterState.setCategory(
      this.selectedCategory?.name ?? null
    );

    this.filterState.setSubCategory(null);
  }

  onSubCategoryChange(): void {
    this.filterState.setSubCategory(
      this.selectedSubCategory?.name ?? null
    );
  }

  onConditionChange(): void {
    this.filterState.setCondition(
      this.selectedCondition?.code ?? null
    );
  }

  onSortChange(): void {
    this.filterState.setSort(
      this.selectedSort ?? null
    );
  }

  applyFilters(): void {
    this.filterState.updateFeedUrl();
  }

  clearFilters(): void {
    this.selectedCategory = undefined;
    this.selectedSubCategory = undefined;
    this.selectedCondition = undefined;
    this.selectedSort = undefined;

    this.subCategories = [];

    this.filterState.reset();
  }

  clearCategory(): void {
    this.selectedCategory = undefined;
    this.selectedSubCategory = undefined;
    this.subCategories = [];

    this.filterState.setCategory(null);
    this.filterState.setSubCategory(null);
  }

  clearSubCategory(): void {
    this.selectedSubCategory = undefined;

    this.filterState.setSubCategory(null);
  }

  clearCondition(): void {
    this.selectedCondition = undefined;

    this.filterState.setCondition(null);
  }

  clearSort(): void {
    this.selectedSort = undefined;

    this.filterState.setSort(null);
  }

  mapItem(item: ItemFeed): ItemFeedCardModel {
    return {
      id: item.id,
      name: item.name,
      conditionLabel: item.itemConditionLabel,
      price: {
        dailyPrice: item.price.dailyPrice
      },
      imageUrl: item.thumbnailStorageKey
        ? `${this.storageUrl}/${item.thumbnailStorageKey}`
        : undefined
    };
  }

  onPageChange(event: any): void {
    const page = event.first / event.rows;
    const size = event.rows;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page,
        size
      },
      queryParamsHandling: 'merge'
    });
  }
}