import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"

export const CheckSame: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get("password")
  const confirmPassword = control.get("passwordRepeat")

  return password.value === confirmPassword.value
    ? null
    : { notSame: true }
}