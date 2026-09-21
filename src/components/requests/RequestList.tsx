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
        requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))
      )}
    </div>
  );
};

export default RequestList;
