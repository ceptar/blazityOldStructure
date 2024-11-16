/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { type AddressFormData } from "@enterprise-commerce/core/platform/saleor/checkout/components/AddressForm/types";
import {
  getEmptyAddressFormData,
  getAddressInputData,
} from "@enterprise-commerce/core/platform/saleor/checkout/components/AddressForm/utils";
import {
  type ChangeHandler,
  useForm,
} from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useForm";
import { useFormSubmit } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useFormSubmit";
import { AddressFormActions } from "@enterprise-commerce/core/platform/saleor/checkout/components/ManualSaveAddressForm";
import { useAddressFormSchema } from "@enterprise-commerce/core/platform/saleor/checkout/components/AddressForm/useAddressFormSchema";
import {
  AddressForm,
  type AddressFormProps,
} from "@enterprise-commerce/core/platform/saleor/checkout/components/AddressForm";
import {
  type AddressFragment,
  type CountryCode,
  useUserAddressCreateMutation,
} from "@enterprise-commerce/core/platform/saleor/checkout/graphql";
import { FormProvider } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useForm/FormProvider";

export interface AddressCreateFormProps
  extends Pick<AddressFormProps, "availableCountries"> {
  onSuccess: (address: AddressFragment) => void;
  onClose: () => void;
}

export const AddressCreateForm: React.FC<AddressCreateFormProps> = ({
  onSuccess,
  onClose,
  availableCountries,
}) => {
  const [, userAddressCreate] = useUserAddressCreateMutation();
  const { setCountryCode, validationSchema } = useAddressFormSchema();

  const onSubmit = useFormSubmit<AddressFormData, typeof userAddressCreate>({
    scope: "userAddressCreate",
    onSubmit: userAddressCreate,
    parse: (addressFormData) => ({
      address: getAddressInputData(addressFormData),
    }),
    onSuccess: ({ data }) => {
      onSuccess(data.address as AddressFragment);
      onClose();
    },
  });

  const form = useForm<AddressFormData>({
    validationSchema,
    initialValues: getEmptyAddressFormData(),
    onSubmit,
  });

  const { handleSubmit, isSubmitting, handleChange } = form;

  const onChange: ChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "countryCode") {
      setCountryCode(value as CountryCode);
    }

    handleChange(event);
  };

  return (
    <FormProvider form={{ ...form, handleChange: onChange }}>
      <AddressForm
        title="Create address"
        availableCountries={availableCountries}
      >
        <AddressFormActions
          onSubmit={handleSubmit}
          loading={isSubmitting}
          onCancel={onClose}
        />
      </AddressForm>
    </FormProvider>
  );
};
