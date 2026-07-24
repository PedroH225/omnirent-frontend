import { Component } from '@angular/core';
import { Toolbar } from "primeng/toolbar";
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '@core/categories/category.service';
import { CategoryResponse } from '@core/categories/model/category.model';
import { SubCategoryResponse } from '@core/categories/model/subcategory.model';

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

  selectedCategory?: CategoryResponse;
  selectedSubCategory?: SubCategoryResponse;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
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
