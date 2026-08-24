import { UserFormModel } from '@features/auth/models/user-form-model';
import { FieldError } from '@shared/models/field-error';
import { FormValidationHelper } from '@shared/validators/form-validation-helper';

export class SaveUserFormValidator {

    static validate(form: UserFormModel): FieldError[] {

        const errors: FieldError[] = [];

        FormValidationHelper.notBlank(
            errors,
            'name',
            form.name,
            'required'
        );

        if (form.name?.trim()) {
            FormValidationHelper.minLength(
                errors,
                'name',
                form.name.trim(),
                5,
                'size'
            );

            FormValidationHelper.maxLength(
                errors,
                'name',
                form.name.trim(),
                100,
                'size'
            );
        }

        FormValidationHelper.notBlank(
            errors,
            'username',
            form.username,
            'required'
        );

        FormValidationHelper.notBlank(
            errors,
            'email',
            form.email,
            'required'
        );

        if (form.email?.trim()) {
            this.validateEmail(errors, form.email);
        }

        this.validateBirthDate(errors, form.birthDate);

        FormValidationHelper.notBlank(
            errors,
            'password',
            form.password,
            'required'
        );

        if (form.password?.trim()) {

            FormValidationHelper.minLength(
                errors,
                'password',
                form.password,
                8,
                'size'
            );

            FormValidationHelper.maxLength(
                errors,
                'password',
                form.password,
                100,
                'size'
            );

            this.validatePasswordPattern(errors, form.password);
        }

        FormValidationHelper.notBlank(
            errors,
            'repeatedPassword',
            form.repeatedPassword,
            'required'
        );

        if (
            form.password &&
            form.repeatedPassword &&
            form.password !== form.repeatedPassword
        ) {
            errors.push({
                field: 'repeatedPassword',
                message: 'password.mismatch'
            });
        }

        return errors;
    }

    private static validateEmail(
        errors: FieldError[],
        email: string
    ): void {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.trim())) {
            errors.push({
                field: 'email',
                message: 'invalid_email'
            });
        }
    }

    private static validateBirthDate(
        errors: FieldError[],
        birthDate: Date | null | undefined
    ): void {

        if (birthDate === null || birthDate === undefined) {
            errors.push({
                field: 'birthDate',
                message: 'required'
            });

            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const date = new Date(birthDate);
        date.setHours(0, 0, 0, 0);

        if (date >= today) {
            errors.push({
                field: 'birthDate',
                message: 'past'
            });
        }
    }

    private static validatePasswordPattern(
        errors: FieldError[],
        password: string
    ): void {

        const passwordPattern =
            /^(?=.*[A-Za-z])(?=.*\d).+$/;

        if (!passwordPattern.test(password)) {
            errors.push({
                field: 'password',
                message: 'password.pattern'
            });
        }
    }
}