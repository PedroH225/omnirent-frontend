import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  ItemImageForm,
  ItemImageView,
} from '@features/items/model/item-image-form-model';
import { ItemImagesValidator } from '@features/items/validators/item-image-validator';
import { FieldError } from '@shared/models/field-error';
import { Button } from 'primeng/button';
import { FieldErrorComponent } from '@shared/components/field-error/field-error.component';
import { TranslatePipe } from '@core/i18n/translation-pipe';

@Component({
  selector: 'app-item-images',
  templateUrl: './item-images.component.html',
  styleUrl: './item-images.component.scss',
  imports: [CommonModule, Button, FieldErrorComponent, TranslatePipe],
})
export class ItemImagesComponent {
  readonly MAX_IMAGES = ItemImagesValidator.MAX_IMAGES;

  images: ItemImageView[] = [];

  errors: FieldError[] = [];

  @Output()
  errorsChange = new EventEmitter<FieldError[]>();

  @Output()
  imagesChange = new EventEmitter<ItemImageForm[]>();

  private emitImages(): void {
    this.imagesChange.emit(
      this.images.map((image) => ({
        tempId: image.tempId,
        file: image.file,
        order: image.order,
      })),
    );
  }

  private validate(): void {
    this.errors = ItemImagesValidator.validate(
      this.images.map((image) => ({
        tempId: image.tempId,
        file: image.file,
        order: image.order,
      })),
    );

    this.errorsChange.emit(this.errors);
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const selectedFiles = Array.from(input.files);
    const remaining = this.MAX_IMAGES - this.images.length;

    if (selectedFiles.length > remaining) {
      this.errors = [
        {
          field: 'images',
          message: 'max_images',
        },
      ];

      this.errorsChange.emit(this.errors);

      input.value = '';
      return;
    }

    selectedFiles.forEach((file) => {
      this.images.push({
        tempId: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
        order: this.images.length,
      });
    });

    this.updateOrder();

    input.value = '';
  }

  removeImage(index: number): void {
    URL.revokeObjectURL(this.images[index].previewUrl);

    this.images.splice(index, 1);

    this.updateOrder();
  }

  moveLeft(index: number): void {
    if (index === 0) {
      return;
    }

    [this.images[index - 1], this.images[index]] = [
      this.images[index],
      this.images[index - 1],
    ];

    this.updateOrder();
  }

  moveRight(index: number): void {
    if (index === this.images.length - 1) {
      return;
    }

    [this.images[index], this.images[index + 1]] = [
      this.images[index + 1],
      this.images[index],
    ];

    this.updateOrder();
  }

  private updateOrder(): void {
    this.images.forEach((image, index) => {
      image.order = index;
    });

    this.validate();
    this.emitImages();
  }

  clear(): void {
    this.images.forEach((image) => URL.revokeObjectURL(image.previewUrl));

    this.images = [];
    this.errors = [];

    this.errorsChange.emit(this.errors);
    this.emitImages();
  }

  getError(index: number): string | undefined {
    return this.errors.find((error) => error.field === `images.${index}`)
      ?.message;
  }

  getCollectionError(): string | undefined {
    return this.errors.find((error) => error.field === 'images')?.message;
  }
}
