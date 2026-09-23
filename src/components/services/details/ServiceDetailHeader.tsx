// src/components/services/details/ServiceDetailHeader.tsx

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import type { ServiceCategoryModel } from "../../../../generated/prisma/models";
import { getServiceImage } from "@/lib/serviceImages";

type Props = {
  service: ServiceCategoryModel;
};

const ServiceDetailHeader = ({ service }: Props) => {
  return (
    <section className="bg-base-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-base-content/60 hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to Services
        </Link>

        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-2xl md:h-32 md:w-48">
            <Image
              src={getServiceImage(service.icon)}
              alt={service.name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Home Repair Service
            </p>

            <h1 className="text-4xl font-bold tracking-tight">
              {service.name}
            </h1>

            <p className="mt-3 max-w-2xl text-base-content/60">
              {service.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailHeader;
