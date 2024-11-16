/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { type AddressFormData } from "@enterprise-commerce/core/platform/saleor/checkout/components/AddressForm/types";
import {
  AddressForm,
  type AddressFormProps,
} from "@enterprise-commerce/core/platform/saleor/checkout/components/AddressForm";
import {
  type AddressFragment,
  type CountryCode,
  useUserAddressDeleteMutation,
  useUserAddressUpdateMutation,
} from "@enterprise-commerce/core/platform/saleor/checkout/graphql";
import { FormProvider } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useForm/FormProvider";
import {
  getAddressFormDataFromAddress,
  getAddressInputData,
} from "@enterprise-commerce/core/platform/saleor/checkout/components/AddressForm/utils";
import {
  type ChangeHandler,
  useForm,
} from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useForm";
import { useFormSubmit } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useFormSubmit";
import { AddressFormActions } from "@enterprise-commerce/core/platform/saleor/checkout/components/ManualSaveAddressForm";
import { useAddressFormSchema } from "@enterprise-commerce/core/platform/saleor/checkout/components/AddressForm/useAddressFormSchema";
import { useSubmit } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useSubmit/useSubmit";

export interface AddressEditFormProps
  extends Pick<AddressFormProps, "title" | "availableCountries"> {
  address: AddressFragment;
  onUpdate: (address: AddressFragment) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export const AddressEditForm: React.FC<AddressEditFormProps> = ({
  onUpdate,
  onClose,
  onDelete,
  address,
  availableCountries,
}) => {
  const [{ fetching: updating }, userAddressUpdate] =
    useUserAddressUpdateMutation();
  const [{ fetching: deleting }, userAddressDelete] =
    useUserAddressDeleteMutation();
  const { setCountryCode, validationSchema } = useAddressFormSchema();

  const onSubmit = useFormSubmit<AddressFormData, typeof userAddressUpdate>({
    scope: "userAddressUpdate",
    onSubmit: userAddressUpdate,
    parse: (formData) => ({
      id: address.id,
      address: { ...getAddressInputData(formData) },
    }),
    onSuccess: ({ data: { address } }) => {
      if (address) {
        onUpdate(address);
      }
      onClose();
    },
  });

  const onAddressDelete = useSubmit<{ id: string }, typeof userAddressDelete>({
    scope: "userAddressDelete",
    onSubmit: userAddressDelete,
    parse: ({ id }) => ({ id }),
    onSuccess: ({ formData: { id } }) => {
      onDelete(id);
      onClose();
    },
  });

  const form = useForm<AddressFormData>({
    validationSchema,
    initialValues: getAddressFormDataFromAddress(address),
    onSubmit,
  });

  const { handleSubmit, handleChange } = form;

  const onChange: ChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "countryCode") {
      setCountryCode(value as CountryCode);
    }

    handleChange(event);
  };

  return (
    <FormProvider form={{ ...form, handleChange: onChange }}>
      <AddressForm title="Edit address" availableCountries={availableCountries}>
        <AddressFormActions
          onSubmit={handleSubmit}
          loading={updating || deleting}
          onCancel={onClose}
          onDelete={() => onAddressDelete({ id: address.id })}
        />
      </AddressForm>
    </FormProvider>
  );
};
