"use client";

import ServiceSelector from "./ServiceSelector";
import ProblemDescription from "./ProblemDescription";
import ImageUploader from "./ImageUploader";
import SchedulePicker from "./SchedulePicker";
import type { ServiceCategoryModel } from "../../../generated/prisma/models";

type RequestFormProps = {
  service?: ServiceCategoryModel | null;
  categories: ServiceCategoryModel[];
};

const RequestForm = ({ service, categories }: RequestFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Later:
    // Send data to server action/API
    // Save into PostgreSQL
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        <button type="submit" className="btn btn-primary">
          Submit Request
        </button>
      </div>
    </form>
  );
};

export default RequestForm;
