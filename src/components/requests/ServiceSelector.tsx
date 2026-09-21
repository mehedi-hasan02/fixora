"use client";

import { Wrench, Zap, Snowflake, Fan, Paintbrush, Refrigerator } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { ServiceCategoryModel } from "../../../generated/prisma/models";

const iconMap = {
  Wrench,
  Zap,
  Snowflake,
  Fan,
  Paintbrush,
  Refrigerator,
};

type ServiceSelectorProps = {
  categories: ServiceCategoryModel[];
};

const ServiceSelector = ({ categories }: ServiceSelectorProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-3">
      <label className="font-semibold">Select Service</label>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {categories.map((category) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap] ?? Wrench;

          return (
            <label key={category.id} className="cursor-pointer">
              <input
                type="radio"
                value={category.id}
                className="peer hidden"
                {...register("categoryId", {
                  required: "Please select a service",
                })}
              />

              <div
                className="
                                flex items-center gap-3
                                rounded-xl border
                                p-4
                                transition
                                peer-checked:border-primary
                                peer-checked:bg-primary/10
                            "
              >
                <Icon size={24} />

                <span>{category.name}</span>
              </div>
            </label>
          );
        })}
      </div>

      {errors.categoryId && (
        <p className="text-xs text-error">
          {errors.categoryId.message as string}
        </p>
      )}
    </div>
  );
};

export default ServiceSelector;
