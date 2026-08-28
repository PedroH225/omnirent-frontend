import { FieldError } from '@shared/models/field-error';
import { FormValidationHelper } from '@shared/validators/form-validation-helper';
import { AddressRequestModel } from '../model/address-request-model';

export class AddressFormValidator {
  static validate(form: AddressRequestModel): FieldError[] {
    const errors: FieldError[] = [];

    FormValidationHelper.notBlank(errors, 'street', form.street, 'blank');

    if (form.street?.trim()) {
      FormValidationHelper.minLength(
        errors,
        'street',
        form.street.trim(),
        3,
        'size',
      );

      FormValidationHelper.maxLength(
        errors,
        'street',
        form.street.trim(),
        120,
        'size',
      );
    }

    FormValidationHelper.notBlank(errors, 'number', form.number, 'blank');

    if (form.number?.trim()) {
      FormValidationHelper.maxLength(
        errors,
        'number',
        form.number.trim(),
        20,
        'max_size',
      );
    }

    if (form.complement?.trim()) {
      FormValidationHelper.maxLength(
        errors,
        'complement',
        form.complement.trim(),
        80,
        'max_size',
      );
    }

    FormValidationHelper.notBlank(errors, 'district', form.district, 'blank');

    if (form.district?.trim()) {
      FormValidationHelper.maxLength(
        errors,
        'district',
        form.district.trim(),
        80,
        'max_size',
      );
    }

    FormValidationHelper.notBlank(errors, 'city', form.city, 'blank');

    if (form.city?.trim()) {
      FormValidationHelper.maxLength(
        errors,
        'city',
        form.city.trim(),
        80,
        'max_size',
      );
    }

    FormValidationHelper.notBlank(errors, 'state', form.state, 'blank');

    if (form.state?.trim()) {
      FormValidationHelper.maxLength(
        errors,
        'state',
        form.state.trim(),
        40,
        'max_size',
      );
    }

    FormValidationHelper.notBlank(errors, 'country', form.country, 'blank');

    if (form.country?.trim()) {
      FormValidationHelper.maxLength(
        errors,
        'country',
        form.country.trim(),
        40,
        'max_size',
      );
    }

    FormValidationHelper.notBlank(errors, 'zipCode', form.zipCode, 'blank');

    if (form.zipCode?.trim()) {
      FormValidationHelper.maxLength(
        errors,
        'zipCode',
        form.zipCode.trim(),
        20,
        'max_size',
      );
    }

    return errors;
  }
}
