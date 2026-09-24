// src/components/services/details/ServiceDetailHeader.tsx

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Clock3, Star } from "lucide-react";

import type { ServiceCategoryModel } from "../../../../generated/prisma/models";
import { getServiceImage } from "@/lib/serviceImages";

type Props = {
  service: ServiceCategoryModel;
};

const ServiceDetailHeader = ({ service }: Props) => {
  return (
    <section className="bg-base-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <nav className="mb-6 flex items-center gap-1.5 text-sm text-base-content/50">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="size-3.5" />
          <Link href="/services" className="hover:text-primary">
            Services
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-base-content/80">{service.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl lg:aspect-auto">
            <Image
              src={getServiceImage(service.icon)}
              alt={service.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold tracking-tight">
              {service.name}
            </h1>

            <div className="mt-2 flex items-center gap-1.5 text-sm">
              <Star className="size-4 fill-warning text-warning" />
              <span className="font-semibold">4.8</span>
              <span className="text-base-content/50">(120+ reviews)</span>
            </div>

            <p className="mt-3 text-base-content/60">{service.description}</p>

            <div className="mt-5 flex items-center gap-6">
              <span className="text-2xl font-bold text-primary">
                ৳{service.basePrice}
              </span>

              <span className="flex items-center gap-1.5 text-sm text-base-content/60">
                <Clock3 className="size-4" />
                {service.estimatedDuration}
              </span>
            </div>

            <Link
              href={`/services/requests?serviceId=${service.id}`}
              className="btn btn-primary mt-6 w-full gap-2 sm:w-fit"
            >
              Request Service
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailHeader;
