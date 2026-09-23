import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ShieldCheck, ArrowRight } from "lucide-react";

import authOptions from "@/lib/authOptions";
import ServiceHeader from "@/components/services/ServiceHeader";
import ServiceSearch from "@/components/services/ServiceSearch";
import ServiceGrid from "@/components/services/ServiceGrid";
import ServiceInfo from "@/components/services/ServiceInfo";
import Reveal from "@/components/motion/Reveal";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-card">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-light">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <Reveal>
            <div className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-sm">
              <ShieldCheck className="mr-2 h-4 w-4 text-success" />
              Trusted home repair services
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your Home
              <span className="block text-accent">Our Priority</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
              From leaking taps to faulty appliances, find the right service and
              get your home problem fixed by a professional.
            </p>

            <ServiceSearch />
          </Reveal>

          <Reveal delay={0.1} className="relative hidden lg:block">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/services/hero.jpg"
                alt="A Fixora technician at work"
                fill
                priority
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <ServiceHeader />

        <ServiceGrid />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <Reveal className="overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Not sure what service you need?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Tell us about your problem and we&apos;ll help you find the right
            service.
          </p>

          <Link
            href="/services/requests"
            className="mt-8 inline-flex items-center rounded-xl bg-card px-6 py-3 text-sm font-semibold text-primary transition hover:bg-background"
          >
            Describe your problem
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* How it works */}
      <ServiceInfo />
    </main>
  );
};

export default page;
