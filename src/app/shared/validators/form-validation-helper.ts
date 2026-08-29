import { FieldError } from "@shared/models/field-error";

export class FormValidationHelper {

    static required(
        errors: FieldError[],
        field: string,
        value: unknown,
        message = 'required'
    ): boolean {
        if (value === null || value === undefined || value === '') {
            errors.push({ field, message });
            return false;
        }

        return true;
    }

    static notBlank(
        errors: FieldError[],
        field: string,
        value: string | null | undefined,
        message = 'blank'
    ): boolean {
        if (!value?.trim()) {
            errors.push({ field, message });
            return false;
        }

        return true;
    }

    static minLength(
        errors: FieldError[],
        field: string,
        value: string,
        min: number,
        message = 'size'
    ): boolean {
        if (value.length < min) {
            errors.push({ field, message });
            return false;
        }

        return true;
    }

    static maxLength(
        errors: FieldError[],
        field: string,
        value: string,
        max: number,
        message = 'max_size'
    ): boolean {
        if (value.length > max) {
            errors.push({ field, message });
            return false;
        }

        return true;
    }

    static positive(
        errors: FieldError[],
        field: string,
        value: number,
        message = 'price_invalid'
    ): boolean {
        if (value <= 0) {
            errors.push({ field, message });
            return false;
        }

        return true;
    }
}