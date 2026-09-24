// src/app/services/[id]/page.tsx

import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ArrowLeft, Wrench } from "lucide-react";

import authOptions from "@/lib/authOptions";
import { getServiceCategoryById } from "@/action/server/services";
import ServiceDetailHeader from "@/components/services/details/ServiceDetailHeader";
import ServiceDetailTabs from "@/components/services/details/ServiceDetailTabs";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (session?.user.role === "ADMIN") {
    redirect("/admin");
  }

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
        <ServiceDetailTabs service={service} />
      </section>
    </main>
  );
};

export default Page;
