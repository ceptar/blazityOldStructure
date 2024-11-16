import { omit } from "lodash-es";
import { useMemo } from "react";
import { useCheckoutShippingAddressUpdateMutation } from "@enterprise-commerce/core/platform/saleor/checkout/graphql";
import { useFormSubmit } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useFormSubmit";
import {
  getAddressFormDataFromAddress,
  getAddressInputData,
  getAddressValidationRulesVariables,
} from "@enterprise-commerce/core/platform/saleor/checkout/components/AddressForm/utils";
import { useCheckoutFormValidationTrigger } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useCheckoutFormValidationTrigger";
import { useCheckout } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useCheckout";
import {
  type AutoSaveAddressFormData,
  useAutoSaveAddressForm,
} from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useAutoSaveAddressForm";
import { useSetCheckoutFormValidationState } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useSetCheckoutFormValidationState";

export const useGuestShippingAddressForm = () => {
  const {
    checkout: { shippingAddress },
  } = useCheckout();

  const [, checkoutShippingAddressUpdate] =
    useCheckoutShippingAddressUpdateMutation();
  const { setCheckoutFormValidationState } =
    useSetCheckoutFormValidationState("shippingAddress");

  const onSubmit = useFormSubmit<
    AutoSaveAddressFormData,
    typeof checkoutShippingAddressUpdate
  >(
    useMemo(
      () => ({
        scope: "checkoutShippingUpdate",
        onSubmit: checkoutShippingAddressUpdate,
        parse: ({ languageCode, checkoutId, ...rest }) => ({
          languageCode,
          checkoutId,
          shippingAddress: getAddressInputData(omit(rest, "channel")),
          validationRules: getAddressValidationRulesVariables({
            autoSave: true,
          }),
        }),
        onSuccess: ({ data, formHelpers }) => {
          void setCheckoutFormValidationState({
            ...formHelpers,
            values: getAddressFormDataFromAddress(
              data.checkout?.shippingAddress
            ),
          });
        },
      }),
      [checkoutShippingAddressUpdate, setCheckoutFormValidationState]
    )
  );

  const form = useAutoSaveAddressForm({
    onSubmit,
    initialValues: getAddressFormDataFromAddress(shippingAddress),
    scope: "checkoutShippingUpdate",
  });

  useCheckoutFormValidationTrigger({
    form,
    scope: "shippingAddress",
  });

  return form;
};
