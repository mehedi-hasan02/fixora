import { Check, XCircle } from "lucide-react";
import {
  STATUS_LABELS,
  TIMELINE_STEPS,
  TIMELINE_STEP_LABELS,
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
    <div className="flex min-w-max items-start overflow-x-auto sm:min-w-0">
      {TIMELINE_STEPS.map((step, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isLast = index === TIMELINE_STEPS.length - 1;

        return (
          <div
            key={step}
            className={`flex items-center ${isLast ? "" : "flex-1"}`}
          >
            <div className="flex flex-col items-center gap-2 px-1">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ${
                  isDone
                    ? "bg-success"
                    : isCurrent
                      ? "bg-primary ring-4 ring-primary/20"
                      : "border-2 border-border bg-card text-muted"
                }`}
              >
                {isDone ? (
                  <Check className="size-4" />
                ) : isCurrent ? (
                  <span className="h-2 w-2 rounded-full bg-white" />
                ) : null}
              </div>

              <span
                className={`whitespace-nowrap text-xs font-medium ${
                  isDone || isCurrent ? "text-text" : "text-muted"
                }`}
              >
                {TIMELINE_STEP_LABELS[step]}
              </span>
            </div>

            {!isLast && (
              <div
                className={`mb-5 h-0.5 min-w-8 flex-1 ${
                  index < currentIndex ? "bg-success" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RequestTimeline;
