import React from "react";
import { AddressForm } from "@enterprise-commerce/core/platform/saleor/checkout/components/AddressForm";
import { FormProvider } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useForm/FormProvider";
import { useAvailableShippingCountries } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useAvailableShippingCountries";
import { useGuestShippingAddressForm } from "@enterprise-commerce/core/platform/saleor/checkout/sections/GuestShippingAddressSection/useGuestShippingAddressForm";

export const GuestShippingAddressSection = () => {
  const { availableShippingCountries } = useAvailableShippingCountries();

  const form = useGuestShippingAddressForm();

  const { handleChange, handleBlur } = form;

  return (
    <FormProvider form={form}>
      <AddressForm
        title="Shipping address"
        availableCountries={availableShippingCountries}
        fieldProps={{
          onChange: handleChange,
          onBlur: handleBlur,
        }}
      />
    </FormProvider>
  );
};
