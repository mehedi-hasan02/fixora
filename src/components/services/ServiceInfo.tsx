import { Search, UserRoundCheck, CalendarCheck } from "lucide-react";

import Reveal from "@/components/motion/Reveal";

const steps = [
  {
    number: "01",
    title: "Choose a service",
    description: "Select the type of home repair you need.",
    icon: Search,
  },
  {
    number: "02",
    title: "Describe the problem",
    description: "Tell us what is wrong and upload a photo if needed.",
    icon: UserRoundCheck,
  },
  {
    number: "03",
    title: "Schedule a visit",
    description: "Choose your preferred date and time for the service.",
    icon: CalendarCheck,
  },
];

const ServiceInfo = () => {
  return (
    <section className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Simple process
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            How Fixora works
          </h2>

          <p className="mt-4 text-muted">
            Getting your home problem fixed is simple.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Reveal key={step.number} className="text-center" delay={index * 0.1}>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-card shadow-sm ring-1 ring-border">
                  <Icon className="h-6 w-6 text-text" />
                </div>

                <p className="mt-5 text-xs font-bold tracking-widest text-muted">
                  STEP {step.number}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-primary">
                  {step.title}
                </h3>

                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted">
                  {step.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceInfo;
