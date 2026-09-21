"use client";

import { useFormContext } from "react-hook-form";

const ProblemDescription = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label className="font-semibold">Problem Title</label>

        <input
          type="text"
          placeholder="Example: Bathroom tap leaking"
          className="input input-bordered mt-2 w-full"
          {...register("title", {
            required: "Please give your problem a short title",
          })}
        />

        {errors.title && (
          <p className="mt-1 text-xs text-error">
            {errors.title.message as string}
          </p>
        )}
      </div>

      <div>
        <label className="font-semibold">Describe Your Problem</label>

        <textarea
          placeholder="Explain what happened..."
          rows={5}
          className="textarea textarea-bordered mt-2 w-full"
          {...register("description", {
            required: "Please describe the problem",
          })}
        />

        {errors.description && (
          <p className="mt-1 text-xs text-error">
            {errors.description.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProblemDescription;
