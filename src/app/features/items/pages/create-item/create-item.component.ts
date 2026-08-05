import { Component, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';

import { ItemService } from '@core/item/item.service';
import { AddressService } from '@core/address/address.service';
import { CategoryService } from '@core/categories/category.service';

import { AddressModel } from '@features/address/model/address-model';

import { FieldError } from '@shared/models/field-error';
import { CategoryResponse } from '@core/categories/model/category.model';
import { SelectOption } from '@shared/models/select-option';
import { SubCategoryResponse } from '@core/categories/model/subcategory.model';
import { Select } from "primeng/select";
import { FormsModule } from '@angular/forms';
import { ItemRequestModel } from '@features/items/model/item-request-model';
import { FieldErrorComponent } from "@shared/components/field-error/field-error.component";
import { Button } from "primeng/button";
import { TabsModule } from 'primeng/tabs';
import { FileUploadModule } from 'primeng/fileupload';
import { EnumOption } from '@shared/models/EnumOption';
import { FloatLabel } from "primeng/floatlabel";
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { AddressCardComponent } from '@features/address/components/address-card/address-card.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiValidationException } from '@shared/models/api-field-exception';
import { ItemImagesComponent } from "@features/items/components/item-images/item-images.component";
import { ItemImageForm } from '@features/items/model/item-image-form-model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ItemCreatedModel } from '@features/items/model/item-created-model';

@Component({
  selector: 'app-create-item',
  imports: [
    FormsModule, InputTextModule, TextareaModule, TabsModule, FileUploadModule,
    Select, FieldErrorComponent, Button, FloatLabel, InputNumberModule, CommonModule,
    AddressCardComponent, ProgressSpinnerModule, ItemImagesComponent
  ],
  providers: [
    ConfirmationService
  ],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.scss'
})
export class CreateItemComponent {
  loading: boolean = false;
  loadingMessage: string = 'Loading...';
  form: ItemRequestModel = this.createEmptyItem();

  backendErrors: FieldError[] = [];

  addresses: AddressModel[] = [];

  conditions: SelectOption<string>[] = [];
  categories: SelectOption<CategoryResponse>[] = [];
  subCategories: SelectOption<string>[] = [];
  selectedCondition?: EnumOption;

  selectedSubCategory?: SubCategoryResponse;
  selectedCategory?: CategoryResponse;

  visitedTabs = new Set<string>();

  images: ItemImageForm[] = [];

  constructor(
    private itemService: ItemService,
    private addressService: AddressService,
    private categoryService: CategoryService,
    private router: Router,
    private messageService: MessageService

  ) { }

  ngOnInit(): void {
    this.loadAddresses();
    this.getCategories();
    this.getItemEnums();
  }

  onImagesChange(images: ItemImageForm[]): void {
    this.images = images;
  }

  save(): void {
    this.loading = true;
    this.loadingMessage = 'Creating item...';
    this.itemService.createItem(this.form).subscribe({

      next: (response: ItemCreatedModel) => {
        if (this.images.length > 0) {
          this.uploadImages(response.id);
        } else {
          this.finishCreation();
        }
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;

        const apiException: ApiValidationException = error.error as ApiValidationException;
        if (apiException?.errorCode == "VALIDATION_ERROR") {
          this.messageService.add({
            severity: 'error',
            summary: 'Validation failed',
            detail: 'Please review the highlighted fields and try again.'
          });

          this.backendErrors = apiException.fields;
        }
        console.error(error);
      }
    });

  }
  uploadImages(itemId: string): void {
    this.loadingMessage = 'Uploading images...';
    this.itemService.uploadImages(itemId, this.images).subscribe({

      next: () => {
        this.finishCreation();
      },

      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Images',
          detail: 'The item was created, but the images could not be uploaded.'
        });

        console.error(error);

        this.finishCreation();
      }

    });

  }

  private finishCreation(): void {
  this.loading = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Item created successfully.'
    });

    this.router.navigate(['/account/my-items']);

  }

  getFieldError(field: string): string | undefined {
    return this.backendErrors.find(
      error => error.field === field
    )?.message;
  }

  onFieldChange(field: string): void {

    this.backendErrors = this.backendErrors.filter(
      error => error.field !== field
    );

  }

  private loadAddresses(): void {

    this.addressService.getUserAddresses().subscribe({
      next: addresses => this.addresses = addresses
    });

  }

  getItemEnums(): void {
    this.itemService.getItemEnums().subscribe({
      next: (response) => {
        this.conditions = response.itemConditions.map(condition => ({
          label: condition.label,
          value: condition.code
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
      }
    });
  }

  onCategoryChange(): void {
    this.selectedSubCategory = undefined;

    this.subCategories =
      this.selectedCategory?.subCategories.map(sub => ({
        label: sub.subCategoryLabel,
        value: sub.id
      })) ?? [];
  }

  get hourlyPrice(): number {
    return (this.form.basePrice ?? 0) * 0.2;
  }

  get weeklyPrice(): number {
    return (this.form.basePrice ?? 0) * 5.5;
  }

  get monthlyPrice(): number {
    return (this.form.basePrice ?? 0) * 22;
  }

  selectAddress(address: AddressModel): void {
    this.form.addressId = address.id;
  }

  getTabHasError(tab: string): boolean {

    if (this.visitedTabs.has(tab)) {
      return false;
    }

    const fieldsByTab: Record<string, string[]> = {
      details: [
        'name',
        'brand',
        'model',
        'description',
        'itemCondition',
        'subCategoryId',
        'basePrice'
      ],
      images: [
        'images'
      ],
      address: [
        'addressId'
      ]
    };

    return this.backendErrors.some(error =>
      fieldsByTab[tab]?.includes(error.field)
    );
  }

  onTabChange(tab: string | number) {
    this.visitedTabs.add(String(tab));
  }

  private createEmptyItem(): ItemRequestModel {

    return {
      name: '',
      model: '',
      brand: '',
      description: '',
      basePrice: 0,
      itemCondition: undefined!,
      subCategoryId: '',
      addressId: ''
    };

  }

}