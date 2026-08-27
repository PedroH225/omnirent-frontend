import { Component } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '@core/categories/category.service';
import { CategoryResponse } from '@core/categories/model/category.model';
import { SubCategoryResponse } from '@core/categories/model/subcategory.model';
import { ItemService } from '@core/item/item.service';
import { EnumOption } from '../../models/EnumOption';
import { SelectOption } from '../../models/select-option';
import { Button } from 'primeng/button';
import { FeedFilterStateService } from '@core/feed/feed-filter-state.service';
import { CommonModule } from '@angular/common';
import { ITEM_FEED_SORTS } from '@shared/models/item-feed-sort';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';

@Component({
  selector: 'app-catalog-bar',
  standalone: true,
  imports: [CommonModule, SelectModule, FormsModule, Button, TranslatePipe],
  templateUrl: './catalog-bar.component.html',
  styleUrl: './catalog-bar.component.scss',
})
export class CatalogBarComponent {
  categories: SelectOption<CategoryResponse>[] = [];
  subCategories: SelectOption<SubCategoryResponse>[] = [];
  itemConditions: SelectOption<EnumOption>[] = [];
  sorts!: SelectOption<string>[];

  selectedCondition?: EnumOption;
  selectedCategory?: CategoryResponse;
  selectedSubCategory?: SubCategoryResponse;
  selectedSort?: string;

  constructor(
    private categoryService: CategoryService,
    private itemService: ItemService,
    private feedFilterState: FeedFilterStateService,
    private translationService: TranslationService,
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getItemEnums();
  }

  getItemEnums(): void {
    this.itemService.getItemEnums().subscribe({
      next: (response) => {
        this.itemConditions = response.itemConditions.map((condition) => ({
          label: this.translationService.translate(
            `enums.itemCondition.${condition.code.toLowerCase()}`,
          ),
          value: condition,
        }));

        this.loadSorts();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getCategories(): void {
    this.categoryService.getCategoriesWithSub().subscribe({
      next: (response) => {
        this.categories = response.map((category) => ({
          label: this.translationService.translate(
            `category.${category.name.toLowerCase()}`,
          ),
          value: category,
        }));
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private loadSorts(): void {
    this.sorts = ITEM_FEED_SORTS.map((sort) => {
      const key = `catalog.sort.${sort.code.toLowerCase()}`;
      const label = this.translationService.translate(key);

      console.log(sort.code, key, label);

      return {
        label,
        value: sort.code,
      };
    });
  }
  onCategoryChange(): void {
    this.selectedSubCategory = undefined;

    this.subCategories =
      this.selectedCategory?.subCategories.map((sub) => ({
        label: this.translationService.translate(
          `subcategory.${sub.name.toLowerCase()}`,
        ),
        value: sub,
      })) ?? [];

    this.feedFilterState.setSubCategory(null);
    this.feedFilterState.setCategory(this.selectedCategory?.name ?? null);
  }

  onSubCategoryChange(): void {
    this.feedFilterState.setSubCategory(this.selectedSubCategory?.name ?? null);
  }

  onConditionChange(): void {
    this.feedFilterState.setCondition(this.selectedCondition?.code ?? null);
  }

  onSortChange(): void {
    this.feedFilterState.setSort(this.selectedSort ?? null);
  }

  clearFilters(): void {
    this.selectedCategory = undefined;
    this.selectedSubCategory = undefined;
    this.selectedCondition = undefined;
    this.selectedSort = undefined;

    this.subCategories = [];

    this.feedFilterState.reset();
  }
}
