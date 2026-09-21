import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RequestCardProps {
  request: {
    id: string;
    service: string;
    title: string;
    status: string;
    date: string;
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
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-bold">{request.service}</h3>

          <p className="text-sm text-base-content/70">{request.title}</p>
        </div>

        <div>
          <span
            className="
badge
badge-primary
"
          >
            {request.status}
          </span>
        </div>
      </div>

      <div className="mt-4 text-sm">
        Preferred Date:
        <strong>{request.date}</strong>
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
