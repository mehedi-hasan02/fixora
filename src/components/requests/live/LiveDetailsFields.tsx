"use client";

import { useRequestLive } from "./RequestLiveProvider";

const LiveDetailsFields = () => {
  const { scheduledAt, estimatedPrice, finalPrice } = useRequestLive();

  return (
    <>
      {scheduledAt && (
        <div>
          <dt className="text-xs text-muted">Confirmed Schedule</dt>
          <dd className="mt-1 text-sm">
            {new Date(scheduledAt).toLocaleString("en-GB")}
          </dd>
        </div>
      )}

      {estimatedPrice !== null && (
        <div>
          <dt className="text-xs text-muted">Estimated Price</dt>
          <dd className="mt-1 text-sm">৳{estimatedPrice}</dd>
        </div>
      )}

      {finalPrice !== null && (
        <div>
          <dt className="text-xs text-muted">Final Price</dt>
          <dd className="mt-1 text-sm">৳{finalPrice}</dd>
        </div>
      )}
    </>
  );
};

export default LiveDetailsFields;
