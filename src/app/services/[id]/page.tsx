// src/app/services/[id]/page.tsx

import Link from "next/link";
import { ArrowLeft, Wrench } from "lucide-react";

import { getServiceCategoryById } from "@/action/server/services";
import ServiceDetailHeader from "@/components/services/details/ServiceDetailHeader";
import ServiceDetailInfo from "@/components/services/details/ServiceDetailInfo";
import ServiceFeatures from "@/components/services/details/ServiceFeatures";
import ServiceHowItWorks from "@/components/services/details/ServiceHowItWorks";
import ServiceRequestCard from "@/components/services/details/ServiceRequestCard";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const service = await getServiceCategoryById(id);

  if (!service) {
    return (
      <main className="min-h-screen bg-base-200 px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <Wrench className="mx-auto mb-4 size-12 text-base-content/40" />

          <h1 className="text-3xl font-bold">Service Not Found</h1>

          <p className="mt-3 text-base-content/60">
            The service you are looking for does not exist.
          </p>

          <Link href="/services" className="btn btn-primary mt-6">
            <ArrowLeft className="size-4" />
            Back to Services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-200">
      <ServiceDetailHeader service={service} />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <ServiceDetailInfo service={service} />

            <ServiceFeatures features={service.features} />

            <ServiceHowItWorks service={service} />
          </div>

          <ServiceRequestCard service={service} />
        </div>
      </section>
    </main>
  );
};

export default Page;
