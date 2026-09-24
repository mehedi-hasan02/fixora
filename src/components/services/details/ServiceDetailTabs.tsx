"use client";

// src/components/services/details/ServiceDetailTabs.tsx

import { useState } from "react";
import { CheckCircle2, ShieldCheck, Tag, UserCheck } from "lucide-react";

import type { ServiceCategoryModel } from "../../../../generated/prisma/models";

type Props = {
  service: ServiceCategoryModel;
};

const TABS = ["Overview", "What's Included", "How It Works"] as const;
type Tab = (typeof TABS)[number];

const TRUST_POINTS = [
  { icon: UserCheck, label: "Expert Technicians" },
  { icon: ShieldCheck, label: "Quality Service" },
  { icon: Tag, label: "Affordable Pricing" },
];

const HOW_IT_WORKS = [
  {
    title: "Describe the Problem",
    description: "Tell us what is wrong and share photos if you have them.",
  },
  {
    title: "Choose a Schedule",
    description: "Select a convenient date and time for the technician visit.",
  },
  {
    title: "Get It Fixed",
    description: "A technician visits your home and solves the problem.",
  },
];

const ServiceDetailTabs = ({ service }: Props) => {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <div className="rounded-2xl bg-base-100 p-6 shadow-sm">
      <div className="flex gap-6 border-b border-base-300">
        {TABS.map((option) => (
          <button
            key={option}
            onClick={() => setTab(option)}
            className={`-mb-px border-b-2 pb-3 text-sm font-medium transition-colors ${
              tab === option
                ? "border-primary text-primary"
                : "border-transparent text-base-content/50 hover:text-base-content/80"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold">Service Overview</h2>

            <p className="mt-3 leading-6 text-base-content/60">
              {service.description}
            </p>

            <div className="mt-6 space-y-4">
              {TRUST_POINTS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>

                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-base-200 p-5">
            <h3 className="font-bold">Common Problems</h3>

            <div className="mt-4 space-y-3">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 shrink-0 text-primary" />

                  <span className="text-sm text-base-content/70">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "What's Included" && (
        <div className="mt-6 space-y-4">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <CheckCircle2 className="size-5 shrink-0 text-success" />

              <span className="text-base-content/80">{feature}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "How It Works" && (
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {HOW_IT_WORKS.map((step, index) => (
            <div key={step.title}>
              <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary font-bold text-primary-content">
                {index + 1}
              </div>

              <h3 className="font-semibold">{step.title}</h3>

              <p className="mt-1 text-sm text-base-content/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceDetailTabs;
