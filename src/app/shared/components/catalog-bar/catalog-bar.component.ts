import { Component } from '@angular/core';
import { Toolbar } from "primeng/toolbar";
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '@core/categories/category.service';
import { CategoryResponse } from '@core/categories/model/category.model';
import { SubCategoryResponse } from '@core/categories/model/subcategory.model';
import { ItemService } from '@core/item/item.service';
import { ItemEnumsResponse } from '@core/item/model/ItemEnumsResponse';
import { EnumOption } from '../../../../shared/models/EnumOption';

interface SelectOption<T> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-catalog-bar',
  standalone: true,
  imports: [Toolbar, SelectModule, FormsModule],
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

  constructor(private categoryService: CategoryService, private itemService: ItemService) { }

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
}
