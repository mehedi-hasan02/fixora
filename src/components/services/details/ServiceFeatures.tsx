// src/components/services/details/ServiceFeatures.tsx

import { CheckCircle2 } from "lucide-react";

type Props = {
  features: string[];
};

const ServiceFeatures = ({ features }: Props) => {
  return (
    <div className="rounded-2xl bg-base-100 p-6 shadow-sm">
      <h2 className="text-2xl font-bold">What We Cover</h2>

      <div className="mt-6 space-y-4">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-3">
            <CheckCircle2 className="size-5 shrink-0 text-success" />

            <span className="text-base-content/80">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceFeatures;
