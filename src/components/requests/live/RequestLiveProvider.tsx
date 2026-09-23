"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { toast } from "react-toastify";

import { STATUS_LABELS, type RequestStatus } from "@/lib/requestStatus";

type LiveData = {
  status: RequestStatus;
  estimatedPrice: number | null;
  finalPrice: number | null;
  scheduledAt: string | null;
  adminNote: string | null;
};

const RequestLiveContext = createContext<LiveData | null>(null);

export const useRequestLive = () => {
  const context = useContext(RequestLiveContext);

  if (!context) {
    throw new Error("useRequestLive must be used within RequestLiveProvider");
  }

  return context;
};

type RequestLiveProviderProps = {
  requestId: string;
  initial: LiveData;
  children: ReactNode;
};

const RequestLiveProvider = ({
  requestId,
  initial,
  children,
}: RequestLiveProviderProps) => {
  const [data, setData] = useState<LiveData>(initial);
  const statusRef = useRef(initial.status);

  useEffect(() => {
    const source = new EventSource(`/api/requests/${requestId}/events`);

    source.onmessage = (event) => {
      const next = JSON.parse(event.data) as LiveData;
      setData(next);
    };

    return () => source.close();
  }, [requestId]);

  // Side effects (toast) must not run inside the setState updater above —
  // that can fire during React's render phase and trigger a cross-component
  // state update, which React flags and can drop under stricter timing.
  useEffect(() => {
    if (statusRef.current !== data.status) {
      toast.info(`Status updated: ${STATUS_LABELS[data.status]}`);
      statusRef.current = data.status;
    }
  }, [data.status]);

  return (
    <RequestLiveContext.Provider value={data}>
      {children}
    </RequestLiveContext.Provider>
  );
};

export default RequestLiveProvider;
