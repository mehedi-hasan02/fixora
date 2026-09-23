import Link from "next/link";
import {
  Wrench,
  Zap,
  Snowflake,
  Fan,
  Paintbrush,
  Refrigerator,
} from "lucide-react";

import RequestStatus from "./RequestStatus";
import type { RequestStatus as RequestStatusType } from "@/lib/requestStatus";
import Reveal from "@/components/motion/Reveal";
import MotionPress from "@/components/motion/MotionPress";

const iconMap = {
  Wrench,
  Zap,
  Snowflake,
  Fan,
  Paintbrush,
  Refrigerator,
};

interface HistoryRequestRowProps {
  request: {
    id: string;
    title: string;
    status: RequestStatusType;
    preferredDate: Date;
    estimatedPrice: number | null;
    finalPrice: number | null;
    category: { name: string; icon: string; basePrice: number };
  };
  index?: number;
}

const HistoryRequestRow = ({ request, index = 0 }: HistoryRequestRowProps) => {
  const Icon = iconMap[request.category.icon as keyof typeof iconMap] ?? Wrench;
  const price = request.finalPrice ?? request.estimatedPrice ?? request.category.basePrice;

  return (
    <Reveal
      delay={index * 0.05}
      className="flex flex-wrap items-center gap-4 rounded-xl border border-border p-4"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-5.5 w-5.5 text-primary" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-text">
          {request.category.name}
        </p>
        <p className="truncate text-xs text-muted">{request.title}</p>
        <p className="mt-1 text-xs text-muted">
          {new Date(request.preferredDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      <RequestStatus status={request.status} />

      <p className="w-16 text-right text-sm font-semibold text-text">
        ৳{price}
      </p>

      <MotionPress className="inline-block">
        <Link
          href={`/dashboard/requests/${request.id}`}
          className="btn btn-sm btn-outline"
        >
          View
        </Link>
      </MotionPress>
    </Reveal>
  );
};

export default HistoryRequestRow;
