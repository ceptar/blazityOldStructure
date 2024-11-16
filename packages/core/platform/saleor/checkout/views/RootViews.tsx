import { Suspense } from "react";
import {
  Checkout,
  CheckoutSkeleton,
} from "@enterprise-commerce/core/platform/saleor/checkout/views/Checkout";
import {
  OrderConfirmation,
  OrderConfirmationSkeleton,
} from "@enterprise-commerce/core/platform/saleor/checkout/views/OrderConfirmation";
import { getQueryParams } from "@enterprise-commerce/core/platform/saleor/checkout/lib/utils/url";
import { PaymentProcessingScreen } from "@enterprise-commerce/core/platform/saleor/checkout/sections/PaymentSection/PaymentProcessingScreen";

export const RootViews = () => {
  const orderId = getQueryParams().orderId;

  if (orderId) {
    return (
      <Suspense fallback={<OrderConfirmationSkeleton />}>
        <OrderConfirmation />
      </Suspense>
    );
  }

  return (
    <PaymentProcessingScreen>
      <Suspense fallback={<CheckoutSkeleton />}>
        <Checkout />
      </Suspense>
    </PaymentProcessingScreen>
  );
};
