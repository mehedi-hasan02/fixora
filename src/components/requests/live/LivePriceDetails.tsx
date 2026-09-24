"use client";

import { useRequestLive } from "./RequestLiveProvider";

type Props = {
  basePrice: number;
};

const LivePriceDetails = ({ basePrice }: Props) => {
  const { estimatedPrice, finalPrice } = useRequestLive();

  const total = finalPrice ?? estimatedPrice;
  const additionalCharges = total !== null ? total - basePrice : null;

  return (
    <div className="rounded-2xl border border-border p-6">
      <h2 className="text-lg font-semibold">Price Details</h2>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted">Base Price</span>
          <span>৳{basePrice}</span>
        </div>

        {additionalCharges !== null && additionalCharges !== 0 && (
          <div className="flex items-center justify-between">
            <span className="text-muted">Additional Charges</span>
            <span>৳{additionalCharges}</span>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border pt-3 text-base font-semibold">
          <span>{finalPrice !== null ? "Total Price" : "Estimated Total"}</span>
          <span className="text-success">৳{total ?? basePrice}</span>
        </div>
      </div>
    </div>
  );
};

export default LivePriceDetails;
