import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import authOptions from "@/lib/authOptions";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, {session.user?.name}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
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
              className="rounded-2xl border border-slate-200 p-5"
            >
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent requests
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            No requests yet.
          </p>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
