import Link from "next/link";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import authOptions from "@/lib/authOptions";
import { getAdminRequestById } from "@/action/server/admin";
import RequestStatus from "@/components/requests/RequestStatus";
import AdminStatusForm from "@/components/admin/AdminStatusForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

const AdminRequestDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/login?callbackUrl=/admin/requests/${id}`);
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const request = await getAdminRequestById(id);

  if (!request) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-card px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin/requests"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to all requests
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted">{request.category.name}</p>
            <h1 className="mt-1 text-2xl font-bold text-primary">
              {request.title}
            </h1>
            <p className="mt-1 text-sm text-muted">
              Requested by {request.user.name} ({request.user.email})
            </p>
          </div>

          <RequestStatus status={request.status} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-border p-6">
              <h2 className="text-lg font-semibold">Problem Description</h2>
              <p className="mt-2 text-sm text-muted">{request.description}</p>
            </div>

            <div className="rounded-2xl border border-border p-6">
              <h2 className="text-lg font-semibold">Details</h2>

              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-muted">Address</dt>
                  <dd className="mt-1 text-sm">{request.address}</dd>
                </div>

                <div>
                  <dt className="text-xs text-muted">Preferred Date</dt>
                  <dd className="mt-1 text-sm">
                    {new Date(request.preferredDate).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs text-muted">Preferred Time</dt>
                  <dd className="mt-1 text-sm">{request.preferredTime}</dd>
                </div>

                {request.scheduledAt && (
                  <div>
                    <dt className="text-xs text-muted">
                      Confirmed Schedule
                    </dt>
                    <dd className="mt-1 text-sm">
                      {new Date(request.scheduledAt).toLocaleString("en-GB")}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {request.images.length > 0 && (
              <div className="rounded-2xl border border-border p-6">
                <h2 className="text-lg font-semibold">Photos</h2>

                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {request.images.map((image) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={image.id}
                      src={image.imageUrl}
                      alt="Problem"
                      className="aspect-square w-full rounded-lg border object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-border p-6">
              <h2 className="text-lg font-semibold">History</h2>

              <div className="mt-4 space-y-3">
                {request.statusHistory.map((entry) => (
                  <div key={entry.id} className="text-sm">
                    <span className="font-medium">
                      {entry.status}
                    </span>
                    {entry.note && (
                      <span className="text-muted"> — {entry.note}</span>
                    )}
                    <span className="ml-2 text-xs text-muted">
                      {new Date(entry.createdAt).toLocaleString("en-GB")}
                      {entry.changedBy ? ` by ${entry.changedBy.name}` : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border p-6">
            <h2 className="text-lg font-semibold">Manage Request</h2>

            <div className="mt-4">
              <AdminStatusForm
                requestId={request.id}
                currentStatus={request.status}
                estimatedPrice={request.estimatedPrice}
                finalPrice={request.finalPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminRequestDetailPage;
