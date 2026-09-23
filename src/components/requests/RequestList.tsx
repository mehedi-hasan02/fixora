import RequestCard from "./RequestCard";
import type { getUserRequests } from "@/action/server/requests";

type RequestListProps = {
  requests: Awaited<ReturnType<typeof getUserRequests>>;
};

const RequestList = ({ requests }: RequestListProps) => {
  return (
    <div className="space-y-4">
      {requests.length === 0 ? (
        <div className="text-center text-base-content/60">
          No service requests found.
        </div>
      ) : (
        requests.map((request, index) => (
          <RequestCard key={request.id} request={request} index={index} />
        ))
      )}
    </div>
  );
};

export default RequestList;
