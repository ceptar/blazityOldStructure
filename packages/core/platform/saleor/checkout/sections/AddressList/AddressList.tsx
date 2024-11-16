import React from "react";
import { camelCase } from "lodash";
import { AddressSelectBox } from "../../components/AddressSelectBox";
import { type AddressFragment } from "@enterprise-commerce/core/platform/saleor/checkout/graphql";
import { SelectBoxGroup } from "@enterprise-commerce/core/platform/saleor/checkout/components/SelectBoxGroup";
import { useAddressAvailability } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useAddressAvailability";
import { Button } from "@enterprise-commerce/core/platform/saleor/checkout/components/Button";
import { Title } from "@enterprise-commerce/core/platform/saleor/checkout/components/Title";
import { type UseFormReturn } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useForm";
import { type AddressListFormData } from "@enterprise-commerce/core/platform/saleor/checkout/sections/AddressList/useAddressListForm";
import { FormProvider } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useForm/FormProvider";

export interface AddressListProps {
  onEditChange: (id: string) => void;
  onAddAddressClick: () => void;
  checkAddressAvailability?: boolean;
  title: string;
  form: UseFormReturn<AddressListFormData>;
}

export const AddressList: React.FC<AddressListProps> = ({
  onEditChange,
  checkAddressAvailability = false,
  title,
  onAddAddressClick,
  form,
}) => {
  const {
    values: { addressList },
  } = form;

  const { isAvailable } = useAddressAvailability(!checkAddressAvailability);

  return (
    <FormProvider form={form}>
      <div className="flex flex-col">
        <Title>{title}</Title>
        {addressList.length < 1 && (
          <p className="mb-3">You currently have no saved addresses.</p>
        )}
        <Button
          variant="secondary"
          ariaLabel="add address"
          onClick={onAddAddressClick}
          label="Add address"
          className="w-full"
        />
        <SelectBoxGroup label="user addresses" className="mt-2">
          {addressList.map(({ id, ...rest }: AddressFragment) => {
            const identifier = `${camelCase(title)}-${id}}`;

            return (
              <AddressSelectBox
                name="selectedAddressId"
                id={identifier}
                key={identifier}
                value={id}
                address={{ ...rest }}
                onEdit={() => onEditChange(id)}
                unavailable={!isAvailable(rest)}
              />
            );
          })}
        </SelectBoxGroup>
      </div>
    </FormProvider>
  );
};
