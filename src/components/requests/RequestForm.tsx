"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import ServiceSelector from "./ServiceSelector";
import ProblemDescription from "./ProblemDescription";
import ImageUploader from "./ImageUploader";
import SchedulePicker from "./SchedulePicker";
import type { ServiceCategoryModel } from "../../../generated/prisma/models";
import { createServiceRequest } from "@/action/server/requests";
import Reveal from "@/components/motion/Reveal";

type RequestFormProps = {
  service?: ServiceCategoryModel | null;
  categories: ServiceCategoryModel[];
};

type RequestFormValues = {
  categoryId: string;
  title: string;
  description: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  images?: FileList;
};

const RequestForm = ({ service, categories }: RequestFormProps) => {
  const router = useRouter();

  const methods = useForm<RequestFormValues>({
    defaultValues: {
      categoryId: service?.id ?? "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: RequestFormValues) => {
    try {
      const result = await createServiceRequest({
        categoryId: data.categoryId,
        title: data.title,
        description: data.description,
        address: data.address,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        images: data.images ? Array.from(data.images) : [],
      });

      if (result.success) {
        toast.success("Request submitted successfully");
        router.push(`/dashboard/requests/${result.requestId}`);
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Selected service from services/[id] */}
        {service ? (
          <Reveal
            className="
          rounded-xl
          border
          bg-base-200
          p-5
        "
          >
            <p className="text-sm text-base-content/60">Selected Service</p>

            <h2 className="mt-1 text-xl font-bold">{service.name}</h2>

            <p className="mt-2 text-sm text-base-content/70">
              {service.description}
            </p>

            <div className="mt-3 flex gap-4 text-sm">
              <span className="badge badge-primary">
                Starting ৳{service.basePrice}
              </span>

              <span className="badge badge-outline">
                {service.estimatedDuration}
              </span>
            </div>
          </Reveal>
        ) : (
          /*
            User does not know service category
            Admin will decide later
          */
          <Reveal>
            <ServiceSelector categories={categories} />
          </Reveal>
        )}

        {/* Problem Details */}
        <Reveal delay={0.05}>
          <ProblemDescription />
        </Reveal>

        {/* Upload Problem Image */}
        <Reveal delay={0.1}>
          <ImageUploader />
        </Reveal>

        {/* Address + Date + Time */}
        <Reveal delay={0.15}>
          <SchedulePicker />
        </Reveal>

        {/* Submit */}
        <Reveal delay={0.2} className="flex justify-end">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.03 } : undefined}
            whileTap={!isSubmitting ? { scale: 0.97 } : undefined}
            className="btn btn-primary disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </motion.button>
        </Reveal>
      </form>
    </FormProvider>
  );
};

export default RequestForm;
