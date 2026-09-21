// src/components/services/details/ServiceRequestCard.tsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { ServiceCategoryModel } from "../../../../generated/prisma/models";

type Props = {
  service: ServiceCategoryModel;
};

const ServiceRequestCard = ({ service }: Props) => {
  return (
    <aside>
      <div className="sticky top-6 rounded-2xl bg-base-100 p-6 shadow-sm">
        <h2 className="text-xl font-bold">Need {service.name}?</h2>

        <p className="mt-2 text-sm leading-6 text-base-content/60">
          Request a professional technician to visit your home.
        </p>

        <div className="my-6 border-t border-base-300" />

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-base-content/60">Starting from</span>

            <span className="font-semibold">৳{service.basePrice}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-base-content/60">Duration</span>

            <span className="font-semibold">{service.estimatedDuration}</span>
          </div>
        </div>

        <Link
          href={`/services/requests?serviceId=${service.id}`}
          className="btn btn-primary mt-6 flex w-full items-center gap-3"
        >
          Request Service
          <ArrowRight className="size-4" />
        </Link>

        <p className="mt-4 text-center text-xs text-base-content/50">
          You can provide photos and details when creating your request.
        </p>
      </div>
    </aside>
  );
};

export default ServiceRequestCard;
