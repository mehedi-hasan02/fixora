import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import authOptions from "@/lib/authOptions";
import { getAllRequests } from "@/action/server/admin";
import RequestStatus from "@/components/requests/RequestStatus";
import RequestFilters from "@/components/admin/RequestFilters";
import type { RequestStatus as RequestStatusType } from "@/lib/requestStatus";

type PageProps = {
  searchParams: Promise<{
    status?: string;
    search?: string;
  }>;
};

const AdminRequestsPage = async ({ searchParams }: PageProps) => {
  const { status, search } = await searchParams;

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/admin/requests");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const requests = await getAllRequests({
    status: status as RequestStatusType | undefined,
    search,
  });

  return (
    <main className="min-h-screen bg-card px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold text-primary">
          Service Requests
        </h1>
        <p className="mt-1 text-sm text-muted">
          Review, approve, and manage all incoming service requests.
        </p>

        <div className="mt-6">
          <RequestFilters />
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-background">
              <tr>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Preferred Date</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold" />
              </tr>
            </thead>

            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted">
                    {status || search
                      ? "No requests match your filters."
                      : "No service requests yet."}
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr key={request.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">{request.user.name}</td>
                    <td className="px-4 py-3">{request.category.name}</td>
                    <td className="px-4 py-3">{request.title}</td>
                    <td className="px-4 py-3">
                      {new Date(request.preferredDate).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "short", year: "numeric" }
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <RequestStatus status={request.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/requests/${request.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default AdminRequestsPage;
