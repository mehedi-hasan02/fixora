// src/components/requests/wizard/WizardStepIndicator.tsx

import { Check } from "lucide-react";

export const WIZARD_STEPS = ["Details", "Date & Time", "Photos", "Review"] as const;

type Props = {
  currentStep: number;
};

const WizardStepIndicator = ({ currentStep }: Props) => {
  return (
    <div className="flex min-w-max items-start overflow-x-auto sm:min-w-0">
      {WIZARD_STEPS.map((label, index) => {
        const step = index + 1;
        const isDone = step < currentStep;
        const isCurrent = step === currentStep;
        const isLast = index === WIZARD_STEPS.length - 1;

        return (
          <div
            key={label}
            className={`flex items-center ${isLast ? "" : "flex-1"}`}
          >
            <div className="flex flex-col items-center gap-2 px-1">
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  isDone
                    ? "bg-success text-white"
                    : isCurrent
                      ? "bg-primary text-primary-content ring-4 ring-primary/20"
                      : "border-2 border-base-300 bg-base-100 text-base-content/40"
                }`}
              >
                {isDone ? <Check className="size-4" /> : step}
              </div>

              <span
                className={`whitespace-nowrap text-xs font-medium ${
                  isDone || isCurrent
                    ? "text-base-content"
                    : "text-base-content/40"
                }`}
              >
                {label}
              </span>
            </div>

            {!isLast && (
              <div
                className={`mb-5 h-0.5 min-w-8 flex-1 ${
                  isDone ? "bg-success" : "bg-base-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WizardStepIndicator;
