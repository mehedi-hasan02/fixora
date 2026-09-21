import { CheckCircle2, Circle, XCircle } from "lucide-react";
import {
  STATUS_LABELS,
  TIMELINE_STEPS,
  type RequestStatus,
} from "@/lib/requestStatus";

type Props = {
  status: RequestStatus;
};

const RequestTimeline = ({ status }: Props) => {
  if (status === "CANCELLED" || status === "REJECTED") {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-error/10 p-4 text-error">
        <XCircle className="size-5 shrink-0" />
        <span className="font-medium">
          This request was {STATUS_LABELS[status].toLowerCase()}.
        </span>
      </div>
    );
  }

  const currentIndex = TIMELINE_STEPS.indexOf(status);

  return (
    <div className="space-y-4">
      {TIMELINE_STEPS.map((step, index) => {
        const isDone = index <= currentIndex;

        return (
          <div key={step} className="flex items-center gap-3">
            {isDone ? (
              <CheckCircle2 className="size-5 shrink-0 text-success" />
            ) : (
              <Circle className="size-5 shrink-0 text-muted" />
            )}

            <span
              className={isDone ? "font-medium text-text" : "text-muted"}
            >
              {STATUS_LABELS[step]}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default RequestTimeline;
