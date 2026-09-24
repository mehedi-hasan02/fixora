"use client";

import { useRequestLive } from "./RequestLiveProvider";

const LiveScheduleField = () => {
  const { scheduledAt } = useRequestLive();

  if (!scheduledAt) return null;

  return (
    <div>
      <dt className="text-xs text-muted">Confirmed Schedule</dt>
      <dd className="mt-1 text-sm font-medium">
        {new Date(scheduledAt).toLocaleString("en-GB")}
      </dd>
    </div>
  );
};

export default LiveScheduleField;
