import React, { Suspense } from "react";
import { AddressForm } from "@enterprise-commerce/core/platform/saleor/checkout/components/AddressForm";
import { FormProvider } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useForm/FormProvider";
import { useGuestBillingAddressForm } from "@enterprise-commerce/core/platform/saleor/checkout/sections/GuestBillingAddressSection/useGuestBillingAddressForm";
import { useCheckout } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useCheckout";
import { AddressSectionSkeleton } from "@enterprise-commerce/core/platform/saleor/checkout/components/AddressSectionSkeleton";
import { useBillingSameAsShippingForm } from "@enterprise-commerce/core/platform/saleor/checkout/sections/GuestBillingAddressSection/useBillingSameAsShippingForm";
import { Checkbox } from "@enterprise-commerce/core/platform/saleor/checkout/components";

export const GuestBillingAddressSection = () => {
  const {
    checkout: { isShippingRequired },
  } = useCheckout();

  const billingSameAsShippingForm = useBillingSameAsShippingForm({
    autoSave: true,
  });

  const {
    values: { billingSameAsShipping },
  } = billingSameAsShippingForm;

  // we want to avoid validating this form on "pay" click when it's not visible
  const form = useGuestBillingAddressForm({
    skipValidation: billingSameAsShipping,
  });

  const { handleBlur, handleChange } = form;

  return (
    <Suspense fallback={<AddressSectionSkeleton />}>
      {isShippingRequired && (
        <div className="mb-4">
          <FormProvider form={billingSameAsShippingForm}>
            <Checkbox
              name="billingSameAsShipping"
              label="Use shipping address as billing address"
              data-testid="useShippingAsBillingCheckbox"
            />
          </FormProvider>
        </div>
      )}
      {!billingSameAsShipping && (
        <div className="mb-4">
          <FormProvider form={form}>
            <AddressForm
              title="Billing address"
              fieldProps={{
                onChange: handleChange,
                onBlur: handleBlur,
              }}
            />
          </FormProvider>
        </div>
      )}
    </Suspense>
  );
};
