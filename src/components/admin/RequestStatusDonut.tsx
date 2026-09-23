import { STATUS_LABELS, type RequestStatus } from "@/lib/requestStatus";

type Props = {
  counts: Record<RequestStatus, number>;
};

const SEGMENT_COLORS: Record<RequestStatus, string> = {
  PENDING: "#F59E0B",
  REVIEWING: "#8B5CF6",
  APPROVED: "#2563EB",
  SCHEDULED: "#60A5FA",
  IN_PROGRESS: "#EC4899",
  COMPLETED: "#16A34A",
  CANCELLED: "#94A3B8",
  REJECTED: "#DC2626",
};

const RADIUS = 60;
const STROKE = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const RequestStatusDonut = ({ counts }: Props) => {
  const entries = (Object.keys(counts) as RequestStatus[])
    .map((status) => ({ status, count: counts[status] }))
    .filter((entry) => entry.count > 0);

  const total = entries.reduce((sum, e) => sum + e.count, 0);

  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
      <svg width="160" height="160" viewBox="0 0 160 160" className="shrink-0">
        <g transform="rotate(-90 80 80)">
          {total === 0 ? (
            <circle
              cx="80"
              cy="80"
              r={RADIUS}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth={STROKE}
            />
          ) : (
            entries.map((entry) => {
              const length = (entry.count / total) * CIRCUMFERENCE;
              const dasharray = `${length} ${CIRCUMFERENCE - length}`;
              const dashoffset = -offset;
              offset += length;

              return (
                <circle
                  key={entry.status}
                  cx="80"
                  cy="80"
                  r={RADIUS}
                  fill="none"
                  stroke={SEGMENT_COLORS[entry.status]}
                  strokeWidth={STROKE}
                  strokeDasharray={dasharray}
                  strokeDashoffset={dashoffset}
                />
              );
            })
          )}
        </g>

        <text
          x="80"
          y="76"
          textAnchor="middle"
          fontSize="24"
          fontWeight="700"
          className="fill-primary"
        >
          {total}
        </text>
        <text
          x="80"
          y="96"
          textAnchor="middle"
          fontSize="11"
          className="fill-muted"
        >
          Total
        </text>
      </svg>

      <ul className="w-full space-y-2">
        {entries.length === 0 ? (
          <li className="text-sm text-muted">No requests yet.</li>
        ) : (
          entries.map((entry) => (
            <li
              key={entry.status}
              className="flex items-center justify-between text-sm"
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: SEGMENT_COLORS[entry.status] }}
                />
                {STATUS_LABELS[entry.status]}
              </span>
              <span className="font-semibold text-text">{entry.count}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RequestStatusDonut;
