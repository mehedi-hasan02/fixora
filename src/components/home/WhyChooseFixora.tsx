import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  DollarSign,
  CalendarCheck,
  Radar,
  Lock,
  Headset,
  ArrowRight,
} from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import MotionPress from "@/components/motion/MotionPress";

const features = [
  {
    icon: ShieldCheck,
    title: "Skilled & Verified Experts",
    description: "Background checked professionals",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Know the cost upfront",
  },
  {
    icon: CalendarCheck,
    title: "Easy Booking",
    description: "Book in just a few clicks",
  },
  {
    icon: Radar,
    title: "Real-Time Tracking",
    description: "Track your service live",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description: "Multiple payment options",
  },
  {
    icon: Headset,
    title: "Customer Support",
    description: "We're here to help",
  },
];

const WhyChooseFixora = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
      <Reveal className="grid gap-10 rounded-3xl bg-background p-8 lg:grid-cols-3 lg:p-12">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Why Choose Fixora
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Reliable. Professional. Always.
          </h2>
          <p className="mt-4 text-muted">
            We make home repairs simple and stress-free. With skilled
            professionals, transparent pricing, and real-time tracking,
            you&apos;re always in control.
          </p>

          <MotionPress className="mt-6 inline-block">
            <Link href="/services/requests" className="btn btn-primary">
              Get Started Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </MotionPress>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-1">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-text">{feature.title}</p>
                <p className="text-sm text-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative hidden lg:block">
          <div className="relative h-full min-h-64 overflow-hidden rounded-2xl">
            <Image
              src="/images/home/living-room.jpg"
              alt="A well-maintained home"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-4 -left-4 rounded-2xl bg-card px-5 py-4 shadow-xl">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold text-text">
                A safer home
                <br />
                is a happier home
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default WhyChooseFixora;
