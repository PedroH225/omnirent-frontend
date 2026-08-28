import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AddressService } from '@core/address/address.service';
import { CategoryService } from '@core/categories/category.service';
import { CategoryResponse } from '@core/categories/model/category.model';
import { SubCategoryResponse } from '@core/categories/model/subcategory.model';
import { ItemService } from '@core/item/item.service';
import { AddressModel } from '@features/address/model/address-model';
import { ItemImageForm } from '@features/items/model/item-image-form-model';
import { FieldError } from '@shared/models/field-error';
import { SelectOption } from '@shared/models/select-option';
import { AddressCardComponent } from '@features/address/components/address-card/address-card.component';
import { TabPanel, Tabs, TabList, Tab, TabPanels } from 'primeng/tabs';
import { ItemImagesComponent } from '../item-images/item-images.component';
import { FieldErrorComponent } from '@shared/components/field-error/field-error.component';
import { FloatLabel } from 'primeng/floatlabel';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemDetailModel } from '@core/item/model/item-detail-model';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ConfirmationService } from 'primeng/api';
import { ItemFormModel } from '@features/items/model/item-form-model';
import { SaveItemFormValidator } from '@features/items/validators/item-form-validator';
import { ItemImagesValidator } from '@features/items/validators/item-image-validator';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';

type ItemFormMode = 'create' | 'edit';

@Component({
  selector: 'app-save-item-form',
  imports: [
    FormsModule,
    CommonModule,
    AddressCardComponent,
    TabPanel,
    ItemImagesComponent,
    FieldErrorComponent,
    FloatLabel,
    Tabs,
    TabList,
    Tab,
    Button,
    InputNumber,
    Select,
    TabPanels,
    InputTextModule,
    TextareaModule,
    TranslatePipe,
  ],
  providers: [ConfirmationService],
  templateUrl: './save-item-form.component.html',
  styleUrl: './save-item-form.component.scss',
})
export class SaveItemFormComponent {
  @Input() mode: ItemFormMode = 'create';
  @Input() item?: ItemDetailModel;
  @Input() backendErrors: FieldError[] = [];

  @Output() save = new EventEmitter<ItemFormModel>();
  @Output() imagesChange = new EventEmitter<ItemImageForm[]>();
  @Output() formChange = new EventEmitter<ItemFormModel>();

  @Output()
  validationError = new EventEmitter<void>();

  form: ItemFormModel = this.createEmptyItem();

  addresses: AddressModel[] = [];

  categories: SelectOption<CategoryResponse>[] = [];
  subCategories: SelectOption<SubCategoryResponse>[] = [];
  conditions: SelectOption<string>[] = [];

  visitedTabs = new Set<string>();

  images: ItemImageForm[] = [];

  localErrors: FieldError[] = [];

  constructor(
    private addressService: AddressService,
    private categoryService: CategoryService,
    private itemService: ItemService,
    private translationService: TranslationService,
  ) {}

  ngOnInit(): void {
    this.loadAddresses();
    this.getCategories();
    this.getItemEnums();
  }

  private initializeEditForm(): void {
    if (!this.item || this.categories.length === 0) {
      return;
    }

    const subCategory = this.item.subCategory;

    const category = this.categories.find((category) =>
      category.value.subCategories.some((sub) => sub.id === subCategory.id),
    )?.value;

    this.form = {
      name: this.item.name,
      brand: this.item.brand,
      model: this.item.model,
      description: this.item.description,
      basePrice: this.item.basePrice,
      itemCondition: this.item.itemCondition,
      category,
      subCategory,
      address: this.item.pickupAddress,
    };

    this.updateSubCategories();
  }

  onSave(): void {
    const formErrors = SaveItemFormValidator.validate(this.form);
    const imageErrors = ItemImagesValidator.validate(this.images);

    this.localErrors = [...formErrors, ...imageErrors];

    if (this.localErrors.length > 0) {
      this.validationError.emit();
      return;
    }

    if (this.localErrors.length > 0) {
      return;
    }

    this.save.emit(this.form);
  }

  onImagesChange(images: ItemImageForm[]): void {
    this.images = images;

    this.imagesChange.emit(this.images);
  }

  getFieldError(field: string): string | undefined {
    const localError = this.localErrors.find((error) => error.field === field);

    if (localError) {
      return this.translationService.translate(localError.message);
    }

    return this.backendErrors.find((error) => error.field === field)?.message;
  }

  onFieldChange(field: string): void {
    this.localErrors = this.localErrors.filter(
      (error) => error.field !== field,
    );

    this.backendErrors = this.backendErrors.filter(
      (error) => error.field !== field,
    );

    this.formChange.emit(this.form);
  }

  private loadAddresses(): void {
    this.addressService.getUserAddresses().subscribe({
      next: (addresses) => (this.addresses = addresses),
    });
  }

  getItemEnums(): void {
    this.itemService.getItemEnums().subscribe({
      next: (response) => {
        this.conditions = response.itemConditions.map((condition) => ({
          label: condition.label,
          value: condition.code,
        }));
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
          label: category.categoryLabel,
          value: category,
        }));

        if (this.mode === 'edit' && this.item) {
          this.initializeCategory();
          this.initializeEditForm();
        }
      },
    });
  }

  private initializeCategory(): void {
    if (!this.form.subCategory) {
      return;
    }

    const category = this.categories.find((category) =>
      category.value.subCategories.some(
        (sub) => sub.id === this.form.subCategory!.id,
      ),
    );

    if (!category) {
      return;
    }

    this.form.category = category.value;
    this.updateSubCategories();
  }

  private updateSubCategories(): void {
    this.subCategories =
      this.form.category?.subCategories.map((sub) => ({
        label: sub.subCategoryLabel,
        value: sub,
      })) ?? [];
  }

  onImageErrorsChange(errors: FieldError[]): void {
    this.localErrors = [
      ...this.localErrors.filter(
        (error) =>
          error.field !== 'images' && !error.field.startsWith('images.'),
      ),
      ...errors,
    ];
  }

  onCategoryChange(): void {
    this.form.subCategory = undefined;

    this.subCategories =
      this.form.category?.subCategories.map((sub) => ({
        label: sub.subCategoryLabel,
        value: sub,
      })) ?? [];

    this.formChange.emit(this.form);
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
    this.form.address = address;
    this.formChange.emit(this.form);
  }

  getTabHasError(tab: string): boolean {
    const fieldsByTab: Record<string, string[]> = {
      details: [
        'name',
        'brand',
        'model',
        'description',
        'itemCondition',
        'subCategoryId',
        'basePrice',
      ],
      images: ['images'],
      address: ['addressId'],
    };

    const fields = fieldsByTab[tab] ?? [];

    return [...this.localErrors, ...this.backendErrors].some((error) => {
      if (tab === 'images') {
        return error.field === 'images' || error.field.startsWith('images.');
      }

      return fields.includes(error.field);
    });
  }

  onTabChange(tab: string | number) {
    this.visitedTabs.add(String(tab));
  }

  resetForm(): void {
    this.visitedTabs.clear();
    this.images = [];
    this.localErrors = [];

    if (this.mode === 'edit' && this.item) {
      this.initializeEditForm();
    } else {
      this.form = this.createEmptyItem();
    }
  }

  private createEmptyItem(): ItemFormModel {
    return {
      name: '',
      model: '',
      brand: '',
      description: '',
      basePrice: 0,
      itemCondition: undefined!,
      subCategory: undefined,
      address: undefined,
    };
  }
}
