"use client";

import RequestTimeline from "../RequestTimeline";
import { useRequestLive } from "./RequestLiveProvider";

const LiveTimeline = () => {
  const { status } = useRequestLive();

  return <RequestTimeline status={status} />;
};

export default LiveTimeline;
