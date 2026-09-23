import type { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const POLL_INTERVAL_MS = 2000;
const HEARTBEAT_INTERVAL_MS = 15000;
const MAX_STREAM_MS = 5 * 60 * 1000; // bounded lifetime; EventSource auto-reconnects

const liveFields = {
  status: true,
  estimatedPrice: true,
  finalPrice: true,
  scheduledAt: true,
  adminNote: true,
} as const;

type LiveRequestRow = {
  status: string;
  estimatedPrice: number | null;
  finalPrice: number | null;
  scheduledAt: Date | null;
  adminNote: string | null;
};

const serialize = (row: LiveRequestRow) =>
  JSON.stringify({
    status: row.status,
    estimatedPrice: row.estimatedPrice,
    finalPrice: row.finalPrice,
    scheduledAt: row.scheduledAt ? row.scheduledAt.toISOString() : null,
    adminNote: row.adminNote,
  });

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const record = await prisma.serviceRequest.findUnique({
    where: { id },
    select: { userId: true, ...liveFields },
  });

  if (!record) {
    return new Response("Not found", { status: 404 });
  }

  const isOwner = record.userId === Number(user.id);
  const isAdmin = user.role === "ADMIN";

  if (!isOwner && !isAdmin) {
    return new Response("Forbidden", { status: 403 });
  }

  let lastSent = serialize(record);

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      let closed = false;

      const send = (data: string) => {
        if (closed) return;
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      };

      send(lastSent);

      const pollTimer = setInterval(async () => {
        try {
          const current = await prisma.serviceRequest.findUnique({
            where: { id },
            select: liveFields,
          });

          if (!current) return;

          const encoded = serialize(current);

          if (encoded !== lastSent) {
            lastSent = encoded;
            send(encoded);
          }
        } catch {
          // transient DB error — skip this tick, retry next interval
        }
      }, POLL_INTERVAL_MS);

      const heartbeatTimer = setInterval(() => {
        if (closed) return;
        controller.enqueue(encoder.encode(`: heartbeat\n\n`));
      }, HEARTBEAT_INTERVAL_MS);

      const cleanup = () => {
        if (closed) return;
        closed = true;
        clearInterval(pollTimer);
        clearInterval(heartbeatTimer);
        clearTimeout(stopTimer);
        try {
          controller.close();
        } catch {
          // already closed
        }
      };

      const stopTimer = setTimeout(cleanup, MAX_STREAM_MS);

      req.signal.addEventListener("abort", cleanup);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
