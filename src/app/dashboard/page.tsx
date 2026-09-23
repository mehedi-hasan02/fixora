import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ClipboardList, CheckCircle2, Clock, Wallet } from "lucide-react";

import authOptions from "@/lib/authOptions";
import { getDashboardStats, getUserRequests } from "@/action/server/requests";
import RequestList from "@/components/requests/RequestList";
import Reveal from "@/components/motion/Reveal";
import MotionPress from "@/components/motion/MotionPress";

const ONGOING_STATUSES = ["PENDING", "REVIEWING", "APPROVED", "SCHEDULED", "IN_PROGRESS"];

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }

  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  const [stats, requests] = await Promise.all([
    getDashboardStats(),
    getUserRequests(),
  ]);

  const ongoingRequests = requests
    .filter((request) => ONGOING_STATUSES.includes(request.status))
    .slice(0, 4);

  const firstName = session.user?.name?.split(" ")[0] ?? "there";

  return (
    <main className="min-h-screen bg-card px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h1 className="text-2xl font-bold text-primary">Dashboard</h1>

          <p className="mt-3 text-lg font-semibold text-text">
            {getGreeting()}, {firstName} 👋
          </p>
          <p className="mt-1 text-sm text-muted">
            Here&apos;s what&apos;s happening with your services.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Active Requests",
              value: stats.inProgress,
              icon: ClipboardList,
              accent: "bg-primary/10 text-primary",
            },
            {
              label: "Completed",
              value: stats.completed,
              icon: CheckCircle2,
              accent: "bg-success/10 text-success",
            },
            {
              label: "Pending",
              value: stats.pending,
              icon: Clock,
              accent: "bg-warning/10 text-warning",
            },
            {
              label: "Total Spent",
              value: `৳${stats.totalSpent}`,
              icon: Wallet,
              accent: "bg-accent/10 text-accent",
            },
          ].map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.08}
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
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={0.1}
          id="requests"
          className="mt-8 scroll-mt-8 rounded-2xl border border-border p-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primary">
              Ongoing Requests
            </h2>

            <Link
              href="/dashboard/history"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="mt-4">
            <RequestList requests={ongoingRequests} />
          </div>
        </Reveal>

        <Reveal
          delay={0.15}
          className="relative mt-8 overflow-hidden rounded-2xl bg-primary px-8 py-10"
        >
          <div className="relative z-10 max-w-sm">
            <h3 className="text-xl font-bold text-white">
              Need a quick repair?
            </h3>
            <p className="mt-2 text-sm text-white/80">
              Our experts are just a click away.
            </p>
            <MotionPress className="mt-5 inline-block">
              <Link
                href="/services/requests"
                className="btn border-none bg-white text-primary hover:bg-white/90"
              >
                Book a Service
              </Link>
            </MotionPress>
          </div>

          <Image
            src="/images/services/hero.jpg"
            alt=""
            width={320}
            height={320}
            className="pointer-events-none absolute -right-6 bottom-0 hidden h-full w-64 object-cover opacity-40 sm:block mask-[linear-gradient(to_left,black,transparent)]"
          />
        </Reveal>
      </div>
    </main>
  );
};

export default DashboardPage;
