import { Search, UserRoundCheck, CalendarCheck } from "lucide-react";

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
    <section className="border-t bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Simple process
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How Fixora works
          </h2>

          <p className="mt-4 text-slate-600">
            Getting your home problem fixed is simple.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                  <Icon className="h-6 w-6 text-slate-700" />
                </div>

                <p className="mt-5 text-xs font-bold tracking-widest text-slate-400">
                  STEP {step.number}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceInfo;
