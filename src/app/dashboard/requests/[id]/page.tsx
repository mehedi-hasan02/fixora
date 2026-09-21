import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getRequestById } from "@/action/server/requests";
import RequestStatus from "@/components/requests/RequestStatus";
import RequestTimeline from "@/components/requests/RequestTimeline";

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

                {request.estimatedPrice !== null && (
                  <div>
                    <dt className="text-xs text-muted">Estimated Price</dt>
                    <dd className="mt-1 text-sm">
                      ৳{request.estimatedPrice}
                    </dd>
                  </div>
                )}

                {request.finalPrice !== null && (
                  <div>
                    <dt className="text-xs text-muted">Final Price</dt>
                    <dd className="mt-1 text-sm">৳{request.finalPrice}</dd>
                  </div>
                )}
              </dl>

              {request.adminNote && (
                <div className="mt-4 rounded-xl bg-background p-4 text-sm">
                  <p className="text-xs font-semibold text-muted">
                    Note from admin
                  </p>
                  <p className="mt-1">{request.adminNote}</p>
                </div>
              )}
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
              <RequestTimeline status={request.status} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RequestDetailPage;
