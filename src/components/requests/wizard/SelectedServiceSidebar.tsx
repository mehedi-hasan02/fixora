// src/components/requests/wizard/SelectedServiceSidebar.tsx

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { ServiceCategoryModel } from "../../../../generated/prisma/models";
import { getServiceImage } from "@/lib/serviceImages";

type Props = {
  service: ServiceCategoryModel | null;
  step: number;
  totalSteps: number;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
};

const SelectedServiceSidebar = ({
  service,
  step,
  totalSteps,
  isSubmitting,
  onBack,
  onNext,
}: Props) => {
  const isLastStep = step === totalSteps;

  return (
    <aside>
      <div className="sticky top-6 rounded-2xl bg-base-100 p-5 shadow-sm">
        <h3 className="font-bold">Selected Service</h3>

        {service ? (
          <>
            <div className="relative mt-4 aspect-4/3 w-full overflow-hidden rounded-xl">
              <Image
                src={getServiceImage(service.icon)}
                alt={service.name}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>

            <p className="mt-3 font-bold">{service.name}</p>

            <p className="mt-0.5 text-sm text-base-content/60">
              {service.description}
            </p>

            <div className="mt-3 flex items-center gap-4 text-sm">
              <span className="font-semibold text-primary">
                ৳{service.basePrice}
              </span>

              <span className="text-base-content/60">
                {service.estimatedDuration}
              </span>
            </div>
          </>
        ) : (
          <p className="mt-4 text-sm text-base-content/50">
            Select a service to see details here.
          </p>
        )}

        <div className="mt-5 flex gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={onBack}
              disabled={isSubmitting}
              className="btn btn-outline flex-1 gap-2 disabled:opacity-60"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
          )}

          <button
            type="button"
            onClick={onNext}
            disabled={isSubmitting}
            className="btn btn-primary flex-1 gap-2 disabled:opacity-60"
          >
            {isLastStep
              ? isSubmitting
                ? "Submitting..."
                : "Confirm Request"
              : "Next"}
            {!isLastStep && <ArrowRight className="size-4" />}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SelectedServiceSidebar;
