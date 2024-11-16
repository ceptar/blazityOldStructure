import {
  type OrderFragment,
  useOrderQuery,
} from "@enterprise-commerce/core/platform/saleor/checkout/graphql";
import { getQueryParams } from "@enterprise-commerce/core/platform/saleor/checkout/lib/utils/url";

export const useOrder = () => {
  const { orderId } = getQueryParams();

  const [{ data, fetching: loading }] = useOrderQuery({
    pause: !orderId,
    variables: { languageCode: "EN_US", id: orderId as string },
  });

  return { order: data?.order as OrderFragment, loading };
};
