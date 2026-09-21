import { STATUS_BADGE_CLASS, STATUS_LABELS, type RequestStatus as RequestStatusType } from "@/lib/requestStatus";

type Props = {
  status: RequestStatusType;
  className?: string;
};

const RequestStatus = ({ status, className = "" }: Props) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${STATUS_BADGE_CLASS[status]} ${className}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
};

export default RequestStatus;
