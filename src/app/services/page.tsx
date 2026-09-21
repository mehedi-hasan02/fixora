import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

import ServiceHeader from "@/components/services/ServiceHeader";
import ServiceSearch from "@/components/services/ServiceSearch";
import ServiceGrid from "@/components/services/ServiceGrid";
import ServiceInfo from "@/components/services/ServiceInfo";

const page = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center rounded-full border bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
              <ShieldCheck className="mr-2 h-4 w-4 text-green-600" />
              Trusted home repair services
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              What can we help you
              <span className="block text-primary">fix today?</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              From leaking taps to faulty appliances, find the right service and
              get your home problem fixed by a professional.
            </p>

            <ServiceSearch />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <ServiceHeader />

        <ServiceGrid />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Not sure what service you need?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Tell us about your problem and we&apos;ll help you find the right
            service.
          </p>

          <Link
            href="/services/requests"
            className="mt-8 inline-flex items-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Describe your problem
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* How it works */}
      <ServiceInfo />
    </main>
  );
};

export default page;
