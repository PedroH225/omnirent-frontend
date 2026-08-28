import { FieldError } from '@shared/models/field-error';
import { ItemImageForm } from '../model/item-image-form-model';

export class ItemImagesValidator {
  private static readonly PREFIX = 'item.form.validation.images.';

  static readonly MAX_IMAGES = 5;

  private static readonly SUPPORTED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
  ];

  static validate(images: ItemImageForm[]): FieldError[] {
    const errors: FieldError[] = [];

    this.validateCount(images, errors);
    this.validateFiles(images, errors);
    this.validateOrders(images, errors);

    return errors.map((error) => ({
      ...error,
      message: `${this.PREFIX}${error.message}`,
    }));
  }

  private static validateCount(
    images: ItemImageForm[],
    errors: FieldError[],
  ): void {
    if (images.length > this.MAX_IMAGES) {
      errors.push({
        field: 'images',
        message: 'max_images',
      });
    }
  }

  private static validateFiles(
    images: ItemImageForm[],
    errors: FieldError[],
  ): void {
    images.forEach((image, index) => {
      const file = image.file;

      if (!file) {
        return;
      }

      if (file.size === 0) {
        errors.push({
          field: `images.${index}`,
          message: 'empty',
        });

        return;
      }

      if (!this.SUPPORTED_TYPES.includes(file.type)) {
        errors.push({
          field: `images.${index}`,
          message: 'unsupported_media_type',
        });
      }
    });
  }

  private static validateOrders(
    images: ItemImageForm[],
    errors: FieldError[],
  ): void {
    const orders = images.map((image) => image.order);

    const hasDuplicate = new Set(orders).size !== orders.length;

    if (hasDuplicate) {
      errors.push({
        field: 'images',
        message: 'duplicate_order',
      });
    }
  }
}
