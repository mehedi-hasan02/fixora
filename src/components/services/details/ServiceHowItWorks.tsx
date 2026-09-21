// src/components/services/details/ServiceHowItWorks.tsx

import type { ServiceCategoryModel } from "../../../../generated/prisma/models";

type Props = {
  service: ServiceCategoryModel;
};

const ServiceHowItWorks = ({ service }: Props) => {
  return (
    <div className="rounded-2xl bg-base-100 p-6 shadow-sm">
      <h2 className="text-2xl font-bold">How It Works</h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        <div>
          <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary font-bold text-primary-content">
            1
          </div>

          <h3 className="font-semibold">Describe the Problem</h3>

          <p className="mt-1 text-sm text-base-content/60">
            Tell us what is wrong with your {service.name.toLowerCase()}.
          </p>
        </div>

        <div>
          <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary font-bold text-primary-content">
            2
          </div>

          <h3 className="font-semibold">Choose a Schedule</h3>

          <p className="mt-1 text-sm text-base-content/60">
            Select a convenient date and time for the technician visit.
          </p>
        </div>

        <div>
          <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary font-bold text-primary-content">
            3
          </div>

          <h3 className="font-semibold">Get It Fixed</h3>

          <p className="mt-1 text-sm text-base-content/60">
            A technician visits your home and solves the problem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceHowItWorks;
