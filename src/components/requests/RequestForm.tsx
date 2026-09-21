"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import ServiceSelector from "./ServiceSelector";
import ProblemDescription from "./ProblemDescription";
import ImageUploader from "./ImageUploader";
import SchedulePicker from "./SchedulePicker";
import type { ServiceCategoryModel } from "../../../generated/prisma/models";
import { createServiceRequest } from "@/action/server/requests";

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
          <div
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
          </div>
        ) : (
          /*
            User does not know service category
            Admin will decide later
          */
          <ServiceSelector categories={categories} />
        )}

        {/* Problem Details */}
        <ProblemDescription />

        {/* Upload Problem Image */}
        <ImageUploader />

        {/* Address + Date + Time */}
        <SchedulePicker />

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default RequestForm;
