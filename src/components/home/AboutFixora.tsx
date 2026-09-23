import Link from "next/link";
import Image from "next/image";
import { Users, CheckCircle2, LayoutGrid, ClipboardList, ArrowRight } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import MotionPress from "@/components/motion/MotionPress";
import { getPublicStats } from "@/action/server/services";

const AboutFixora = async () => {
  const stats = await getPublicStats();

  const statTiles = [
    {
      label: "Happy Customers",
      value: stats.happyCustomers,
      icon: Users,
    },
    {
      label: "Completed Services",
      value: stats.completedServices,
      icon: CheckCircle2,
    },
    {
      label: "Service Categories",
      value: stats.serviceCategories,
      icon: LayoutGrid,
    },
    {
      label: "Total Requests",
      value: stats.totalRequests,
      icon: ClipboardList,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr_1fr] lg:items-center">
        <Reveal className="relative aspect-4/3 overflow-hidden rounded-3xl">
          <Image
            src="/images/home/about.jpg"
            alt="A Fixora technician beside a Fixora service van"
            fill
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            About Fixora
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            We&apos;re on a mission to make home repair simple and
            stress-free.
          </h2>
          <p className="mt-4 text-muted">
            Fixora was built with one goal in mind — to connect homeowners
            with trusted professionals for all their repair needs. We
            believe every home deserves to be safe, comfortable, and
            well-maintained.
          </p>

          <MotionPress className="mt-6 inline-block">
            <Link href="/services/requests" className="btn btn-primary">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </MotionPress>
        </Reveal>

        <Reveal delay={0.2} className="grid grid-cols-2 gap-4">
          {statTiles.map((tile) => (
            <div
              key={tile.label}
              className="rounded-2xl border border-border p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <tile.icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-lg font-bold text-primary">
                {tile.value}
              </p>
              <p className="text-xs text-muted">{tile.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default AboutFixora;
