import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import RequestForm from "@/components/requests/RequestForm";
import authOptions from "@/lib/authOptions";
import {
  getServiceCategories,
  getServiceCategoryById,
} from "@/action/server/services";
import Reveal from "@/components/motion/Reveal";

type PageProps = {
  searchParams: Promise<{
    serviceId?: string;
  }>;
};

const Page = async ({ searchParams }: PageProps) => {
  const { serviceId } = await searchParams;

  const session = await getServerSession(authOptions);

  if (!session) {
    const callbackUrl = serviceId
      ? `/services/requests?serviceId=${serviceId}`
      : "/services/requests";

    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  const [categories, selectedService] = await Promise.all([
    getServiceCategories(),
    serviceId ? getServiceCategoryById(serviceId) : Promise.resolve(null),
  ]);

  return (
    <main className="min-h-screen bg-base-200 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}

        <Reveal className="mb-8">
          <h1 className="text-3xl font-bold">Request a Service</h1>

          <p className="mt-2 text-base-content/60">
            {selectedService
              ? `Book ${selectedService.name} service`
              : "Tell us about your problem and we will help you find the right service."}
          </p>
        </Reveal>

        {/* Request Form */}

        <Reveal
          delay={0.05}
          className="
          rounded-2xl
          bg-base-100
          p-6
          shadow-md
        "
        >
          <RequestForm service={selectedService} categories={categories} />
        </Reveal>
      </div>
    </main>
  );
};

export default Page;
