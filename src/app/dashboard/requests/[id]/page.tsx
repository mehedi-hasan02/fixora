import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  MessageSquare,
  Wrench,
  Images,
} from "lucide-react";

import { getRequestById } from "@/action/server/requests";
import RequestLiveProvider from "@/components/requests/live/RequestLiveProvider";
import LiveStatusBadge from "@/components/requests/live/LiveStatusBadge";
import LiveTimeline from "@/components/requests/live/LiveTimeline";
import LiveScheduleField from "@/components/requests/live/LiveScheduleField";
import LivePriceDetails from "@/components/requests/live/LivePriceDetails";
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

  const requestCode = `FX-${request.id.slice(-6).toUpperCase()}`;
  const coverImage = request.images[0];

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
        <div className="mx-auto max-w-5xl">
          <Link
            href="/dashboard"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to requests
          </Link>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                {request.category.name} Request #{requestCode}
              </h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                <Calendar className="size-4" />
                {request.createdAt.toLocaleString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <LiveStatusBadge />
          </div>

          <div className="mt-8 rounded-2xl border border-border p-6">
            <LiveTimeline />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-border p-6 lg:col-span-2">
              <h2 className="text-lg font-semibold">Service Details</h2>

              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex gap-3">
                  <Wrench className="size-4 shrink-0 text-muted" />
                  <div>
                    <dt className="text-xs text-muted">Service</dt>
                    <dd className="mt-0.5 font-medium">
                      {request.category.name}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  <MessageSquare className="size-4 shrink-0 text-muted" />
                  <div>
                    <dt className="text-xs text-muted">Problem</dt>
                    <dd className="mt-0.5 font-medium">
                      {request.description}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  <MapPin className="size-4 shrink-0 text-muted" />
                  <div>
                    <dt className="text-xs text-muted">Address</dt>
                    <dd className="mt-0.5 font-medium">{request.address}</dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Calendar className="size-4 shrink-0 text-muted" />
                  <div>
                    <dt className="text-xs text-muted">
                      Preferred Date &amp; Time
                    </dt>
                    <dd className="mt-0.5 font-medium">
                      {new Date(request.preferredDate).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "long", year: "numeric" }
                      )}
                      , {request.preferredTime}
                    </dd>
                  </div>
                </div>

                <LiveScheduleField />
              </dl>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border">
              {coverImage ? (
                <div className="relative h-full min-h-48 w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverImage.imageUrl}
                    alt="Request photo"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {request.images.length > 1 && (
                    <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
                      <Images className="size-3.5" />
                      {request.images.length} photos
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex h-full min-h-48 items-center justify-center p-6 text-center text-sm text-muted">
                  No photos attached
                </div>
              )}
            </div>
          </div>

          {request.images.length > 1 && (
            <div className="mt-6 rounded-2xl border border-border p-6">
              <h2 className="text-lg font-semibold">Photos</h2>

              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {request.images.map((image) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={image.id}
                    src={image.imageUrl}
                    alt="Problem"
                    className="aspect-square w-full rounded-lg border border-border object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <LivePriceDetails basePrice={request.category.basePrice} />
            </div>

            <LiveAdminNote />
          </div>
        </div>
      </main>
    </RequestLiveProvider>
  );
};

export default RequestDetailPage;
