import RequestCard from "./RequestCard";

const RequestList = () => {
  const requests = [
    {
      id: "1",
      service: "Plumbing",
      title: "Bathroom tap leaking",
      status: "PENDING",
      date: "10 September 2026",
    },
    {
      id: "2",
      service: "AC Repair",
      title: "AC is not cooling",
      status: "APPROVED",
      date: "12 September 2026",
    },
  ];

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
