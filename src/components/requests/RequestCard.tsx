import Link from "next/link";
import { ArrowRight } from "lucide-react";

import RequestStatus from "./RequestStatus";
import type { RequestStatus as RequestStatusType } from "@/lib/requestStatus";

interface RequestCardProps {
  request: {
    id: string;
    title: string;
    status: RequestStatusType;
    preferredDate: Date;
    category: { name: string };
  };
}

const RequestCard = ({ request }: RequestCardProps) => {
  return (
    <div
      className="
rounded-xl
border
bg-base-100
p-5
shadow-sm
"
    >
      <div className="flex justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold">{request.category.name}</h3>

          <p className="text-sm text-base-content/70">{request.title}</p>
        </div>

        <RequestStatus status={request.status} />
      </div>

      <div className="mt-4 text-sm">
        Preferred Date:{" "}
        <strong>
          {new Date(request.preferredDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </strong>
      </div>

      <Link
        href={`/dashboard/requests/${request.id}`}
        className="
btn
btn-sm
btn-outline
mt-4
flex
gap-2
"
      >
        View Details
        <ArrowRight size={16} />
      </Link>
    </div>
  );
};

export default RequestCard;
