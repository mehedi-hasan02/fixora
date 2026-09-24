"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import WizardStepIndicator, {
  WIZARD_STEPS,
} from "./wizard/WizardStepIndicator";
import SelectedServiceSidebar from "./wizard/SelectedServiceSidebar";
import StepDetails from "./wizard/StepDetails";
import StepSchedule from "./wizard/StepSchedule";
import StepPhotos from "./wizard/StepPhotos";
import StepReview from "./wizard/StepReview";
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

const STEP_FIELDS: Record<number, (keyof RequestFormValues)[]> = {
  1: ["categoryId", "title", "description", "address"],
  2: ["preferredDate", "preferredTime"],
  3: [],
  4: [],
};

const RequestForm = ({ service, categories }: RequestFormProps) => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const methods = useForm<RequestFormValues>({
    defaultValues: {
      categoryId: service?.id ?? "",
      title: "",
      description: "",
      address: "",
      preferredDate: "",
      preferredTime: "",
    },
  });

  const {
    handleSubmit,
    trigger,
    watch,
    formState: { isSubmitting },
  } = methods;

  const categoryId = watch("categoryId");
  const selectedCategory =
    categories.find((category) => category.id === categoryId) ??
    (service?.id === categoryId ? service : null) ??
    null;

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

  const handleNext = async () => {
    if (step === WIZARD_STEPS.length) {
      await handleSubmit(onSubmit)();
      return;
    }

    const valid = await trigger(STEP_FIELDS[step]);

    if (valid) {
      setStep((current) => current + 1);
    }
  };

  const handleBack = () => {
    setStep((current) => Math.max(1, current - 1));
  };

  return (
    <FormProvider {...methods}>
      <div className="rounded-2xl bg-base-100 p-6 shadow-sm">
        <WizardStepIndicator currentStep={step} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-base-100 p-6 shadow-sm lg:col-span-2">
          {step === 1 && (
            <StepDetails
              categories={categories}
              selectedCategory={selectedCategory}
            />
          )}

          {step === 2 && <StepSchedule />}

          {step === 3 && <StepPhotos />}

          {step === 4 && <StepReview selectedCategory={selectedCategory} />}
        </div>

        <SelectedServiceSidebar
          service={selectedCategory}
          step={step}
          totalSteps={WIZARD_STEPS.length}
          isSubmitting={isSubmitting}
          onBack={handleBack}
          onNext={handleNext}
        />
      </div>
    </FormProvider>
  );
};

export default RequestForm;
