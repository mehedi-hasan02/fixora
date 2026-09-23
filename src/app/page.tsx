import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Home as HomeIcon, ArrowRight } from "lucide-react";

import authOptions from "@/lib/authOptions";
import { getServiceCategories } from "@/action/server/services";
import HomeHero from "@/components/home/HomeHero";
import ServiceQuickNav from "@/components/home/ServiceQuickNav";
import WhyChooseFixora from "@/components/home/WhyChooseFixora";
import AboutFixora from "@/components/home/AboutFixora";
import Testimonials from "@/components/home/Testimonials";
import ServiceInfo from "@/components/services/ServiceInfo";
import Reveal from "@/components/motion/Reveal";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "ADMIN") {
    redirect("/admin");
  }

  const categories = await getServiceCategories();

  return (
    <main className="min-h-screen bg-card">
      <HomeHero categories={categories} />

      <ServiceQuickNav categories={categories} />

      <WhyChooseFixora />

      <ServiceInfo />

      <AboutFixora />

      <Testimonials />

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center sm:px-12">
          <HomeIcon className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 text-white/10" />

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Fix Your Home?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Book your service today and experience hassle-free home repair.
          </p>

          <Link
            href="/services/requests"
            className="relative mt-8 inline-flex items-center rounded-xl bg-card px-6 py-3 text-sm font-semibold text-primary transition hover:bg-background"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </main>
  );
};

export default HomePage;
