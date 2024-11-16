import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { EmptyCartPage } from "../EmptyCartPage";
import { PageNotFound } from "../PageNotFound";
import { useUser } from "../../hooks/useUser";
import {
  Summary,
  SummarySkeleton,
} from "@enterprise-commerce/core/platform/saleor/checkout/sections/Summary";
import {
  CheckoutForm,
  CheckoutFormSkeleton,
} from "@enterprise-commerce/core/platform/saleor/checkout/sections/CheckoutForm";
import { useCheckout } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useCheckout";
import { CheckoutSkeleton } from "@enterprise-commerce/core/platform/saleor/checkout/views/Checkout/CheckoutSkeleton";

export const Checkout = () => {
  const { checkout, fetching: fetchingCheckout } = useCheckout();
  const { loading: isAuthenticating } = useUser();

  const isCheckoutInvalid = !fetchingCheckout && !checkout && !isAuthenticating;

  const isInitiallyAuthenticating = isAuthenticating && !checkout;

  const isEmptyCart = checkout && !checkout.lines.length;

  return isCheckoutInvalid ? (
    <PageNotFound />
  ) : isInitiallyAuthenticating ? (
    <CheckoutSkeleton />
  ) : (
    <ErrorBoundary FallbackComponent={PageNotFound}>
      <div className="page">
        {isEmptyCart ? (
          <EmptyCartPage />
        ) : (
          <div className="grid min-h-screen grid-cols-1 gap-x-16 lg:grid-cols-2">
            <Suspense fallback={<CheckoutFormSkeleton />}>
              <CheckoutForm />
            </Suspense>
            <Suspense fallback={<SummarySkeleton />}>
              <Summary {...checkout} />
            </Suspense>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};
