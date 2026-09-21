// src/components/services/details/ServiceDetailInfo.tsx

import { Clock3 } from "lucide-react";

import type { ServiceCategoryModel } from "../../../../generated/prisma/models";

type Props = {
  service: ServiceCategoryModel;
};

const ServiceDetailInfo = ({ service }: Props) => {
  return (
    <div className="rounded-2xl bg-base-100 p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Service Information</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-base-200 p-5">
          <p className="text-sm text-base-content/60">Starting Price</p>

          <p className="mt-1 text-2xl font-bold text-primary">
            ৳{service.basePrice}
          </p>

          <p className="mt-1 text-xs text-base-content/50">
            Final price may vary after inspection
          </p>
        </div>

        <div className="rounded-xl bg-base-200 p-5">
          <p className="text-sm text-base-content/60">Estimated Duration</p>

          <p className="mt-1 flex items-center gap-2 text-2xl font-bold">
            <Clock3 className="size-5 text-primary" />
            {service.estimatedDuration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailInfo;
