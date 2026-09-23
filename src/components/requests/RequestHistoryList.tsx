"use client";

import { useState } from "react";

import HistoryRequestRow from "./HistoryRequestRow";
import type { getUserRequests } from "@/action/server/requests";

type Requests = Awaited<ReturnType<typeof getUserRequests>>;

const FILTERS = ["All", "Completed", "Cancelled"] as const;
type Filter = (typeof FILTERS)[number];

const matchesFilter = (status: string, filter: Filter) => {
  if (filter === "All") return true;
  if (filter === "Completed") return status === "COMPLETED";
  return status === "CANCELLED" || status === "REJECTED";
};

const RequestHistoryList = ({ requests }: { requests: Requests }) => {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = requests.filter((request) => matchesFilter(request.status, filter));

  return (
    <div>
      <div className="flex gap-2">
        {FILTERS.map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === option
                ? "bg-primary text-white"
                : "border border-border text-muted hover:bg-background"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-muted">
            No requests found for this filter.
          </p>
        ) : (
          filtered.map((request, index) => (
            <HistoryRequestRow key={request.id} request={request} index={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default RequestHistoryList;
