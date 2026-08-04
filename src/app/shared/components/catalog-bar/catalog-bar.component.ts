import { Component } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '@core/categories/category.service';
import { CategoryResponse } from '@core/categories/model/category.model';
import { SubCategoryResponse } from '@core/categories/model/subcategory.model';
import { ItemService } from '@core/item/item.service';
import { EnumOption } from '../../models/EnumOption';
import { ItemFeedSort } from '../../models/item-feed-sort';
import { SelectOption } from '../../models/select-option';
import { Button } from "primeng/button";



export const ITEM_FEED_SORTS: ItemFeedSort[] = [
  {
    code: 'NEWEST',
    label: 'Newest'
  },
  {
    code: 'PRICE_ASC',
    label: 'Lowest price'
  },
  {
    code: 'PRICE_DESC',
    label: 'Highest price'
  }
];

@Component({
  selector: 'app-catalog-bar',
  standalone: true,
  imports: [SelectModule, FormsModule, Button],
  templateUrl: './catalog-bar.component.html',
  styleUrl: './catalog-bar.component.scss'
})
export class CatalogBarComponent {
  categories: SelectOption<CategoryResponse>[] = [];
  subCategories: SelectOption<SubCategoryResponse>[] = [];
  itemConditions: SelectOption<EnumOption>[] = [];

  selectedCondition?: EnumOption;
  selectedCategory?: CategoryResponse;
  selectedSubCategory?: SubCategoryResponse;
  selectedSort?: string;

  constructor(private categoryService: CategoryService, private itemService: ItemService) { }

  sorts: SelectOption<string>[] = ITEM_FEED_SORTS.map(sort => ({
    label: sort.label,
    value: sort.code
  }));

  ngOnInit() {
    this.getCategories();
    this.getItemEnums();
  }

  getItemEnums(): void {
    this.itemService.getItemEnums().subscribe({
      next: (response) => {
        this.itemConditions = response.itemConditions.map(condition => ({
          label: condition.label,
          value: condition
        }));
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  getCategories(): void {
    this.categoryService.getCategoriesWithSub().subscribe({
      next: (response) => {
        this.categories = response.map(category => ({
          label: category.categoryLabel,
          value: category
        }));
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onCategoryChange(): void {
    this.selectedSubCategory = undefined;

    this.subCategories =
      this.selectedCategory?.subCategories.map(sub => ({
        label: sub.subCategoryLabel,
        value: sub
      })) ?? [];
  }

  clearFilters(): void {
    this.selectedCategory = undefined;
    this.selectedSubCategory = undefined;
    this.selectedCondition = undefined;
    this.selectedSort = undefined;

    this.subCategories = [];
  }
}
