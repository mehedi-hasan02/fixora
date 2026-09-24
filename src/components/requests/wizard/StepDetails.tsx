"use client";

// src/components/requests/wizard/StepDetails.tsx

import { MapPin } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { ServiceCategoryModel } from "../../../../generated/prisma/models";

const DESCRIPTION_MAX_LENGTH = 500;

type Props = {
  categories: ServiceCategoryModel[];
  selectedCategory: ServiceCategoryModel | null;
};

const StepDetails = ({ categories, selectedCategory }: Props) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const description: string = watch("description") ?? "";

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold">Service Details</h2>

      <div>
        <label className="text-sm font-medium">
          Select Service <span className="text-error">*</span>
        </label>

        <select
          className="select select-bordered mt-2 w-full"
          {...register("categoryId", {
            required: "Please select a service",
          })}
        >
          <option value="" disabled>
            Choose a service
          </option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {errors.categoryId && (
          <p className="mt-1 text-xs text-error">
            {errors.categoryId.message as string}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">
          Problem Type <span className="text-error">*</span>
        </label>

        <select
          className="select select-bordered mt-2 w-full"
          disabled={!selectedCategory}
          {...register("title", {
            required: "Please select a problem type",
          })}
        >
          <option value="" disabled>
            {selectedCategory
              ? "Choose a problem type"
              : "Select a service first"}
          </option>

          {selectedCategory?.features.map((feature) => (
            <option key={feature} value={feature}>
              {feature}
            </option>
          ))}

          <option value="Other issue">Other issue</option>
        </select>

        {errors.title && (
          <p className="mt-1 text-xs text-error">
            {errors.title.message as string}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">
          Description <span className="text-error">*</span>
        </label>

        <textarea
          placeholder="Describe your problem in detail..."
          rows={4}
          maxLength={DESCRIPTION_MAX_LENGTH}
          className="textarea textarea-bordered mt-2 w-full"
          {...register("description", {
            required: "Please describe the problem",
            maxLength: DESCRIPTION_MAX_LENGTH,
          })}
        />

        <div className="mt-1 flex items-center justify-between">
          {errors.description ? (
            <p className="text-xs text-error">
              {errors.description.message as string}
            </p>
          ) : (
            <span />
          )}

          <span className="text-xs text-base-content/40">
            {description.length}/{DESCRIPTION_MAX_LENGTH}
          </span>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">
          Address <span className="text-error">*</span>
        </label>

        <div className="relative mt-2">
          <input
            type="text"
            placeholder="House 12, Road 4, Dhanmondi, Dhaka"
            className="input input-bordered w-full pr-10"
            {...register("address", {
              required: "Please provide the service address",
            })}
          />

          <MapPin className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-base-content/40" />
        </div>

        {errors.address && (
          <p className="mt-1 text-xs text-error">
            {errors.address.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default StepDetails;
