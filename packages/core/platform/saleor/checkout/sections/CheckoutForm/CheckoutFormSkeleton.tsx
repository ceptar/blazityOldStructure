import React from "react";
import { ContactSkeleton } from "@enterprise-commerce/core/platform/saleor/checkout/sections/Contact";
import { DeliveryMethodsSkeleton } from "@enterprise-commerce/core/platform/saleor/checkout/sections/DeliveryMethods";
import { PaymentSectionSkeleton } from "@enterprise-commerce/core/platform/saleor/checkout/sections/PaymentSection";
import { Divider } from "@enterprise-commerce/core/platform/saleor/checkout/components";
import { AddressSectionSkeleton } from "@enterprise-commerce/core/platform/saleor/checkout/components/AddressSectionSkeleton";

export const CheckoutFormSkeleton = () => (
  <div className="flex flex-col items-end">
    <div className="flex w-full flex-col rounded ">
      <ContactSkeleton />
      <Divider />
      <AddressSectionSkeleton />
      <Divider />
      <DeliveryMethodsSkeleton />
      <Divider />
      <PaymentSectionSkeleton />
    </div>
  </div>
);
