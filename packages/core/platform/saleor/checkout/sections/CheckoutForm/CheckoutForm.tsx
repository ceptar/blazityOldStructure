import { Suspense, useState } from "react";
import { useCheckout } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useCheckout";
import { Contact } from "@enterprise-commerce/core/platform/saleor/checkout/sections/Contact";
import { DeliveryMethods } from "@enterprise-commerce/core/platform/saleor/checkout/sections/DeliveryMethods";
import { ContactSkeleton } from "@enterprise-commerce/core/platform/saleor/checkout/sections/Contact/ContactSkeleton";
import { DeliveryMethodsSkeleton } from "@enterprise-commerce/core/platform/saleor/checkout/sections/DeliveryMethods/DeliveryMethodsSkeleton";
import { AddressSectionSkeleton } from "@enterprise-commerce/core/platform/saleor/checkout/components/AddressSectionSkeleton";
import { getQueryParams } from "@enterprise-commerce/core/platform/saleor/checkout/lib/utils/url";
import { CollapseSection } from "@enterprise-commerce/core/platform/saleor/checkout/sections/CheckoutForm/CollapseSection";
import { Divider } from "@enterprise-commerce/core/platform/saleor/checkout/components";
import { UserShippingAddressSection } from "@enterprise-commerce/core/platform/saleor/checkout/sections/UserShippingAddressSection";
import { GuestShippingAddressSection } from "@enterprise-commerce/core/platform/saleor/checkout/sections/GuestShippingAddressSection";
import { UserBillingAddressSection } from "@enterprise-commerce/core/platform/saleor/checkout/sections/UserBillingAddressSection";
import {
  PaymentSection,
  PaymentSectionSkeleton,
} from "@enterprise-commerce/core/platform/saleor/checkout/sections/PaymentSection";
import { GuestBillingAddressSection } from "@enterprise-commerce/core/platform/saleor/checkout/sections/GuestBillingAddressSection";
import { useUser } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useUser";

export const CheckoutForm = () => {
  const { user } = useUser();
  const { checkout } = useCheckout();
  const { passwordResetToken } = getQueryParams();

  const [showOnlyContact, setShowOnlyContact] = useState(!!passwordResetToken);

  return (
    <div className="flex flex-col items-end">
      <div className="flex w-full flex-col rounded">
        <Suspense fallback={<ContactSkeleton />}>
          <Contact setShowOnlyContact={setShowOnlyContact} />
        </Suspense>
        <>
          {checkout?.isShippingRequired && (
            <Suspense fallback={<AddressSectionSkeleton />}>
              <CollapseSection collapse={showOnlyContact}>
                <Divider />
                <div className="py-4" data-testid="shippingAddressSection">
                  {user ? (
                    <UserShippingAddressSection />
                  ) : (
                    <GuestShippingAddressSection />
                  )}
                </div>
                {user ? (
                  <UserBillingAddressSection />
                ) : (
                  <GuestBillingAddressSection />
                )}
              </CollapseSection>
            </Suspense>
          )}
          <Suspense fallback={<DeliveryMethodsSkeleton />}>
            <DeliveryMethods collapsed={showOnlyContact} />
          </Suspense>
          <Suspense fallback={<PaymentSectionSkeleton />}>
            <CollapseSection collapse={showOnlyContact}>
              <PaymentSection />
            </CollapseSection>
          </Suspense>
        </>
      </div>
    </div>
  );
};
