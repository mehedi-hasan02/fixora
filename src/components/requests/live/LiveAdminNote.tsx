"use client";

import { useRequestLive } from "./RequestLiveProvider";

const LiveAdminNote = () => {
  const { adminNote } = useRequestLive();

  if (!adminNote) return null;

  return (
    <div className="mt-4 rounded-xl bg-background p-4 text-sm">
      <p className="text-xs font-semibold text-muted">Note from admin</p>
      <p className="mt-1">{adminNote}</p>
    </div>
  );
};

export default LiveAdminNote;
