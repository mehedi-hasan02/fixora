"use client";

import { useRequestLive } from "./RequestLiveProvider";

const LiveAdminNote = () => {
  const { adminNote } = useRequestLive();

  return (
    <div className="rounded-2xl border border-border p-6">
      <h2 className="text-lg font-semibold">Admin Note</h2>

      <p className="mt-3 text-sm text-muted">
        {adminNote ?? "No notes from the admin yet."}
      </p>
    </div>
  );
};

export default LiveAdminNote;
