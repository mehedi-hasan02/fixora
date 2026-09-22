import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
  ClipboardList,
  Clock,
  Loader2,
  CheckCircle2,
  XCircle,
  Users,
  LayoutGrid,
  ArrowRight,
} from "lucide-react";

import authOptions from "@/lib/authOptions";
import { getAdminDashboardStats } from "@/action/server/admin";
import RequestStatus from "@/components/requests/RequestStatus";

const AdminDashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/admin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const stats = await getAdminDashboardStats();

  const statCards = [
    {
      label: "Total Requests",
      value: stats.totalRequests,
      icon: ClipboardList,
      accent: "bg-primary/10 text-primary",
    },
    {
      label: "Needs Review",
      value: stats.pending,
      icon: Clock,
      accent: "bg-warning/10 text-warning",
    },
    {
      label: "In Progress",
      value: stats.active,
      icon: Loader2,
      accent: "bg-secondary/10 text-secondary",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      accent: "bg-success/10 text-success",
    },
    {
      label: "Cancelled / Rejected",
      value: stats.closed,
      icon: XCircle,
      accent: "bg-error/10 text-error",
    },
    {
      label: "Customers",
      value: stats.totalUsers,
      icon: Users,
      accent: "bg-accent/10 text-accent",
    },
    {
      label: "Active Services",
      value: stats.totalCategories,
      icon: LayoutGrid,
      accent: "bg-primary/10 text-primary",
    },
  ];

  return (
    <main className="min-h-screen bg-card px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted">
              Review and manage every service request coming into Fixora.
            </p>
          </div>

          <Link href="/admin/requests" className="btn btn-primary">
            Review All Requests
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border p-5"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.accent}`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm text-muted">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primary">
              Recent requests
            </h2>
            <Link
              href="/admin/requests"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="px-2 py-3 font-semibold text-muted">
                    Customer
                  </th>
                  <th className="px-2 py-3 font-semibold text-muted">
                    Service
                  </th>
                  <th className="px-2 py-3 font-semibold text-muted">
                    Status
                  </th>
                  <th className="px-2 py-3 font-semibold text-muted">
                    Submitted
                  </th>
                  <th className="px-2 py-3" />
                </tr>
              </thead>

              <tbody>
                {stats.recentRequests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-2 py-8 text-center text-muted"
                    >
                      No service requests yet.
                    </td>
                  </tr>
                ) : (
                  stats.recentRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-2 py-3">{request.user.name}</td>
                      <td className="px-2 py-3">{request.category.name}</td>
                      <td className="px-2 py-3">
                        <RequestStatus status={request.status} />
                      </td>
                      <td className="px-2 py-3 text-muted">
                        {new Date(request.createdAt).toLocaleDateString(
                          "en-GB",
                          { day: "numeric", month: "short", year: "numeric" }
                        )}
                      </td>
                      <td className="px-2 py-3 text-right">
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
      </div>
    </main>
  );
};

export default AdminDashboardPage;
