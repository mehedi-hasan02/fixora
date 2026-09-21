import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import authOptions from "@/lib/authOptions";
import { getDashboardStats, getUserRequests } from "@/action/server/requests";
import RequestList from "@/components/requests/RequestList";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const [stats, requests] = await Promise.all([
    getDashboardStats(),
    getUserRequests(),
  ]);

  const recentRequests = requests.slice(0, 5);

  return (
    <main className="min-h-screen bg-card px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Welcome back, {session.user?.name}
            </h1>

            <p className="mt-1 text-sm text-muted">
              Track your service requests and account activity here.
            </p>
          </div>

          <Link href="/services/requests" className="btn btn-primary">
            New Request
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Requests", value: stats.total },
            { label: "Pending", value: stats.pending },
            { label: "In Progress", value: stats.inProgress },
            { label: "Completed", value: stats.completed },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border p-5"
            >
              <p className="text-sm text-muted">{stat.label}</p>
              <p className="mt-2 text-2xl font-bold text-primary">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border p-6">
          <h2 className="text-lg font-semibold text-primary">
            Recent requests
          </h2>

          <div className="mt-4">
            <RequestList requests={recentRequests} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
