import { CalendarCheck, ClipboardCheck, Wrench, CheckCircle2, ArrowRight } from "lucide-react";

import Reveal from "@/components/motion/Reveal";

const steps = [
  {
    number: "1",
    title: "Book a Service",
    description: "Choose your service, describe the problem, and select your preferred date and time.",
    icon: CalendarCheck,
  },
  {
    number: "2",
    title: "Get a Confirmation",
    description: "We'll review your request and confirm the details with you.",
    icon: ClipboardCheck,
  },
  {
    number: "3",
    title: "We Fix It",
    description: "Our skilled professional will visit your home at the scheduled time.",
    icon: Wrench,
  },
  {
    number: "4",
    title: "Service Completed",
    description: "Your request is marked complete once the job is done.",
    icon: CheckCircle2,
  },
];

const ServiceInfo = () => {
  return (
    <section className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            How It Works
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Get Your Home Fixed in 4 Simple Steps
          </h2>
        </Reveal>

        <div className="mt-14 grid items-start gap-10 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Reveal key={step.number} delay={index * 0.1} className="relative text-center">
                {index < steps.length - 1 && (
                  <ArrowRight className="absolute -right-6 top-6 hidden h-5 w-5 text-border md:block" />
                )}

                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-card shadow-sm ring-1 ring-border">
                  <Icon className="h-6 w-6 text-primary" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-primary">
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
