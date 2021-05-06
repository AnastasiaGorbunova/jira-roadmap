import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const emptyFieldValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
	const value = control ? (`${control.value || ''}`).trim() : '';

	return !value.length ? { emptyValue: { value: control.value } } : null;
};