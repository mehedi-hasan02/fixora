import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import authOptions from "@/lib/authOptions";
import { getUserRequests } from "@/action/server/requests";
import RequestHistoryList from "@/components/requests/RequestHistoryList";
import Reveal from "@/components/motion/Reveal";

const RequestHistoryPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/dashboard/history");
  }

  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  const requests = await getUserRequests();

  return (
    <main className="min-h-screen bg-card px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>

          <h1 className="mt-3 text-2xl font-bold text-primary">
            Service History
          </h1>
        </Reveal>

        <Reveal delay={0.08} className="mt-6 rounded-2xl border border-border p-6">
          <RequestHistoryList requests={requests} />
        </Reveal>
      </div>
    </main>
  );
};

export default RequestHistoryPage;
