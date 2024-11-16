import { type ValidationState } from "@enterprise-commerce/core/platform/saleor/checkout/state/checkoutValidationStateStore/checkoutValidationStateStore";

export const anyFormsValidating = (validationState: ValidationState) =>
  Object.values(validationState).some((val) => val === "validating");

export const areAllFormsValid = (validationState: ValidationState): boolean =>
  !anyFormsValidating(validationState) &&
  Object.values(validationState).every((value) => value === "valid");