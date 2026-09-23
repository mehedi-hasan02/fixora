import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import authOptions from "@/lib/authOptions";
import ServiceGrid from "@/components/services/ServiceGrid";
import Reveal from "@/components/motion/Reveal";

const ServicesPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-card">
      <section className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <Reveal>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Our Services
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Browse Home Repair Services
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Choose a service that matches your problem and get started in
              just a few steps.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <ServiceGrid />
      </section>
    </main>
  );
};

export default ServicesPage;
