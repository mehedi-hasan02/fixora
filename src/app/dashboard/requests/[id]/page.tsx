import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getRequestById } from "@/action/server/requests";
import RequestLiveProvider from "@/components/requests/live/RequestLiveProvider";
import LiveStatusBadge from "@/components/requests/live/LiveStatusBadge";
import LiveTimeline from "@/components/requests/live/LiveTimeline";
import LiveDetailsFields from "@/components/requests/live/LiveDetailsFields";
import LiveAdminNote from "@/components/requests/live/LiveAdminNote";

type PageProps = {
  params: Promise<{ id: string }>;
};

const RequestDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;

  let request;

  try {
    request = await getRequestById(id);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHENTICATED") {
      redirect(`/login?callbackUrl=/dashboard/requests/${id}`);
    }

    if (error instanceof Error && error.message === "FORBIDDEN") {
      notFound();
    }

    throw error;
  }

  if (!request) {
    notFound();
  }

  return (
    <RequestLiveProvider
      requestId={id}
      initial={{
        status: request.status,
        estimatedPrice: request.estimatedPrice,
        finalPrice: request.finalPrice,
        scheduledAt: request.scheduledAt
          ? request.scheduledAt.toISOString()
          : null,
        adminNote: request.adminNote,
      }}
    >
      <main className="min-h-screen bg-card px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/dashboard"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Link>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted">{request.category.name}</p>
              <h1 className="mt-1 text-2xl font-bold text-primary">
                {request.title}
              </h1>
            </div>

            <LiveStatusBadge />
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

                  <LiveDetailsFields />
                </dl>

                <LiveAdminNote />
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
            </div>

            <div className="rounded-2xl border border-border p-6">
              <h2 className="text-lg font-semibold">Status Timeline</h2>

              <div className="mt-4">
                <LiveTimeline />
              </div>
            </div>
          </div>
        </div>
      </main>
    </RequestLiveProvider>
  );
};

export default RequestDetailPage;
