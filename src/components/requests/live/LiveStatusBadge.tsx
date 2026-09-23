"use client";

import { AnimatePresence, motion } from "framer-motion";

import RequestStatus from "../RequestStatus";
import { useRequestLive } from "./RequestLiveProvider";

const LiveStatusBadge = () => {
  const { status } = useRequestLive();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <RequestStatus status={status} />
      </motion.div>
    </AnimatePresence>
  );
};

export default LiveStatusBadge;
