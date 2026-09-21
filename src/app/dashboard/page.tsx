import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import authOptions from "@/lib/authOptions";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }

  return (
    <main className="min-h-screen bg-card px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-primary">
          Welcome back, {session.user?.name}
        </h1>

        <p className="mt-1 text-sm text-muted">
          Track your service requests and account activity here.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Requests", value: 0 },
            { label: "Pending", value: 0 },
            { label: "In Progress", value: 0 },
            { label: "Completed", value: 0 },
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
          <p className="mt-2 text-sm text-muted">
            No requests yet.
          </p>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
