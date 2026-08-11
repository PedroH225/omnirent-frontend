import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddressService } from '@core/address/address.service';
import { CategoryService } from '@core/categories/category.service';
import { CategoryResponse } from '@core/categories/model/category.model';
import { SubCategoryResponse } from '@core/categories/model/subcategory.model';
import { ItemService } from '@core/item/item.service';
import { AddressModel } from '@features/address/model/address-model';
import { ItemImageForm } from '@features/items/model/item-image-form-model';
import { ItemRequestModel } from '@features/items/model/item-request-model';
import { EnumOption } from '@shared/models/EnumOption';
import { FieldError } from '@shared/models/field-error';
import { SelectOption } from '@shared/models/select-option';
import { AddressCardComponent } from "@features/address/components/address-card/address-card.component";
import { TabPanel, Tabs, TabList, Tab, TabPanels } from "primeng/tabs";
import { ItemImagesComponent } from "../item-images/item-images.component";
import { FieldErrorComponent } from "@shared/components/field-error/field-error.component";
import { FloatLabel } from "primeng/floatlabel";
import { Button } from "primeng/button";
import { InputNumber } from "primeng/inputnumber";
import { Select } from "primeng/select";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemDetailModel } from '@core/item/model/item-detail-model';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ConfirmationService } from 'primeng/api';

type ItemFormMode = 'create' | 'edit';

@Component({
  selector: 'app-save-item-form',
  imports: [FormsModule, CommonModule, AddressCardComponent, TabPanel, ItemImagesComponent, FieldErrorComponent,
    FloatLabel, Tabs, TabList, Tab, Button, InputNumber, Select, TabPanels, InputTextModule, TextareaModule],
  providers: [
    ConfirmationService
  ],
  templateUrl: './save-item-form.component.html',
  styleUrl: './save-item-form.component.scss'
})
export class SaveItemFormComponent {
  @Input() mode: ItemFormMode = 'create';
  @Input() item?: ItemDetailModel;
  @Input () backendErrors: FieldError[] = [];

  @Output() save = new EventEmitter<ItemRequestModel>();
  @Output() imagesChange = new EventEmitter<ItemImageForm[]>();
  @Output() formChange = new EventEmitter<ItemRequestModel>();

  form: ItemRequestModel = this.createEmptyItem();


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
    private addressService: AddressService, private categoryService: CategoryService, private itemService: ItemService) { }

  ngOnInit(): void {
    this.loadAddresses();
    this.getCategories();
    this.getItemEnums();
  }

  onSave(): void {
    this.save.emit(this.form);
  }

  onImagesChange(images: ItemImageForm[]): void {
    this.images = images;
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

    this.formChange.emit(this.form);
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
