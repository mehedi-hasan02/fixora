"use client";

// src/components/requests/wizard/StepReview.tsx

import { useFormContext } from "react-hook-form";

import type { ServiceCategoryModel } from "../../../../generated/prisma/models";

type Props = {
  selectedCategory: ServiceCategoryModel | null;
};

const StepReview = ({ selectedCategory }: Props) => {
  const { watch } = useFormContext();

  const values = watch();
  const images: FileList | undefined = values.images;
  const photoCount = images?.length ?? 0;

  const rows: [string, string][] = [
    ["Service", selectedCategory?.name ?? "-"],
    ["Problem Type", values.title || "-"],
    ["Address", values.address || "-"],
    ["Preferred Date", values.preferredDate || "-"],
    ["Preferred Time", values.preferredTime || "-"],
    ["Photos", photoCount > 0 ? `${photoCount} attached` : "None"],
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold">Review Your Request</h2>

      <div className="divide-y divide-base-300 rounded-xl border border-base-300">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 p-4 text-sm">
            <span className="text-base-content/60">{label}</span>
            <span className="text-right font-medium">{value}</span>
          </div>
        ))}
      </div>

      <div>
        <p className="text-sm font-medium text-base-content/60">
          Description
        </p>

        <p className="mt-1 rounded-xl bg-base-200 p-4 text-sm leading-6">
          {values.description || "-"}
        </p>
      </div>
    </div>
  );
};

export default StepReview;
