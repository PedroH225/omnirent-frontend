import { FieldError } from "@shared/models/field-error";


export class FormErrorUtil {

  static getFieldError(
    errors: FieldError[],
    field: string
  ): string | undefined {
    return errors.find(
      error => error.field === field
    )?.message;
  }


  static hasFieldError(
    errors: FieldError[],
    field: string
  ): boolean {
    return errors.some(
      error => error.field === field
    );
  }


  static setErrors(
    responseErrors: FieldError[]
  ): FieldError[] {
    return responseErrors ?? [];
  }


  static clearFieldError(
    errors: FieldError[],
    field: string
  ): FieldError[] {
    return errors.filter(
      error => error.field !== field
    );
  }

}