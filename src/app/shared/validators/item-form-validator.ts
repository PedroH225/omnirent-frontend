import { ItemRequestModel } from '@features/items/model/item-request-model';
import { FieldError } from '@shared/models/field-error';
import { FormValidationHelper } from './form-validation-helper';
import { ItemFormModel } from '@features/items/model/item-form-model';

export class SaveItemFormValidator {

    static validate(form: ItemFormModel): FieldError[] {
        const errors: FieldError[] = [];

        this.validateName(form, errors);
        this.validateModel(form, errors);
        this.validateBrand(form, errors);
        this.validateDescription(form, errors);
        this.validateBasePrice(form, errors);
        this.validateItemCondition(form, errors);
        this.validateSubCategory(form, errors);
        this.validateAddress(form, errors);

        return errors;
    }

    private static validateName(
        form: ItemFormModel,
        errors: FieldError[]
    ): void {
        const value = form.name;

        if (!FormValidationHelper.notBlank(errors, 'name', value)) {
            return;
        }

        FormValidationHelper.minLength(errors, 'name', value, 3);
        FormValidationHelper.maxLength(errors, 'name', value, 100);
    }

    private static validateModel(
        form: ItemFormModel,
        errors: FieldError[]
    ): void {
        const value = form.model;

        if (!FormValidationHelper.notBlank(errors, 'model', value)) {
            return;
        }

        FormValidationHelper.maxLength(errors, 'model', value, 50);
    }

    private static validateBrand(
        form: ItemFormModel,
        errors: FieldError[]
    ): void {
        const value = form.brand;

        if (!FormValidationHelper.notBlank(errors, 'brand', value)) {
            return;
        }

        FormValidationHelper.maxLength(errors, 'brand', value, 50);
    }

    private static validateDescription(
        form: ItemFormModel,
        errors: FieldError[]
    ): void {
        const value = form.description;

        if (value == null || value === '') {
            return;
        }

        FormValidationHelper.maxLength(
            errors,
            'description',
            value,
            1000
        );
    }

    private static validateBasePrice(
        form: ItemFormModel,
        errors: FieldError[]
    ): void {
        const value = form.basePrice;

        if (!FormValidationHelper.required(
            errors,
            'basePrice',
            value
        )) {
            return;
        }

        FormValidationHelper.positive(
            errors,
            'basePrice',
            value
        );
    }

    private static validateItemCondition(
        form: ItemFormModel,
        errors: FieldError[]
    ): void {
        FormValidationHelper.required(
            errors,
            'itemCondition',
            form.itemCondition
        );
    }

    private static validateSubCategory(
        form: ItemFormModel,
        errors: FieldError[]
    ): void {
        FormValidationHelper.required(
            errors,
            'addressId',
            form.address?.id
        );
        
        FormValidationHelper.notBlank(
            errors,
            'subCategoryId',
            form.subCategory?.id
        );
    }

    private static validateAddress(
        form: ItemFormModel,
        errors: FieldError[]
    ): void {
        FormValidationHelper.required(
            errors,
            'addressId',
            form.address?.id
        );

        FormValidationHelper.notBlank(
            errors,
            'addressId',
            form.address?.id
        );
    }
}