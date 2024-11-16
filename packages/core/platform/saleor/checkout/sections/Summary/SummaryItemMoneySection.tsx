import { type OrderLineFragment } from "@enterprise-commerce/core/platform/saleor/checkout/graphql";
import { SummaryItemMoneyInfo } from "@enterprise-commerce/core/platform/saleor/checkout/sections/Summary/SummaryItemMoneyInfo";

interface LineItemQuantitySelectorProps {
  line: OrderLineFragment;
}

export const SummaryItemMoneySection: React.FC<
  LineItemQuantitySelectorProps
> = ({ line }) => {
  return (
    <div className="flex flex-col items-end">
      <p>Qty: {line.quantity}</p>
      <SummaryItemMoneyInfo
        {...line}
        undiscountedUnitPrice={line.undiscountedUnitPrice.gross}
      />
    </div>
  );
};
