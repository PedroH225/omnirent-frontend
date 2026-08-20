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

@Component({
  selector: 'app-item-feed',
  imports: [
    ItemFeedCardComponent, ItemFeedListComponent, DataView,
    CommonModule, FormsModule, SelectButton,
    Button,
    Select
],
  templateUrl: './item-feed.component.html',
  styleUrl: './item-feed.component.scss'
})
export class ItemFeedComponent implements OnInit {
  items: ItemFeed[] = [];

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
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      this.name = params['name'] || null;
      this.category = params['category'] || null;
      this.subCategory = params['subCategory'] || null;
      this.itemCondition = params['itemCondition'] || null;
      this.sort = params['sort'] || null;

      this.page = Number(params['page'] ?? 0);
      this.size = Number(params['size'] ?? 20);

      this.loadItems();
    });
  }

  loadItems(): void {
    this.itemService.getItemFeed(
      this.name, this.category, this.subCategory,
      this.itemCondition, this.sort,
      this.page, this.size).subscribe({
        next: (response: PageResponse<ItemFeed>) => {
          this.items = response.content;
          this.totalElements = response.totalElements;
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        }
      });
  }

  loadCategories(): void {

  }

  loadItemEnums(): void {

  }

  onCategoryChange(): void {

  }

  onSubCategoryChange(): void {

  }

  onConditionChange(): void {

  }

  onSortChange(): void {

  }

  clearFilters(): void {

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