import { type FallbackProps } from "react-error-boundary";
import { SaleorLogo } from "@enterprise-commerce/core/platform/saleor/checkout/assets/images/SaleorLogo";
import { Button } from "@enterprise-commerce/core/platform/saleor/checkout/components/Button";
import { ErrorContentWrapper } from "@enterprise-commerce/core/platform/saleor/checkout/components/ErrorContentWrapper";

export const PageNotFound = ({ error }: Partial<FallbackProps>) => {
  console.error(error);

  // eslint-disable-next-line no-restricted-globals
  const goBack = () => history.back();

  return (
    <ErrorContentWrapper>
      <div className="mb-4 flex w-28 flex-col">
        <SaleorLogo />
      </div>
      <p>
        We couldn&apos;t fetch information about your checkout. Go back to the
        store and try again.
      </p>
      <Button
        ariaLabel="Go back to store"
        onClick={goBack}
        variant="secondary"
        label="Go back to store"
      />
    </ErrorContentWrapper>
  );
};
