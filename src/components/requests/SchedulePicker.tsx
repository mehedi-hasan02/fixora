"use client";

import { useFormContext } from "react-hook-form";

const slots = ["9 AM - 11 AM", "11 AM - 1 PM", "2 PM - 4 PM", "4 PM - 6 PM"];

const todayIso = () => new Date().toISOString().split("T")[0];

const SchedulePicker = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <label className="font-semibold">Service Address</label>

        <textarea
          placeholder="House, road, area, city..."
          rows={3}
          className="textarea textarea-bordered mt-2 w-full"
          {...register("address", {
            required: "Please provide the service address",
          })}
        />

        {errors.address && (
          <p className="mt-1 text-xs text-error">
            {errors.address.message as string}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <label className="font-semibold">Preferred Schedule</label>

        <input
          type="date"
          min={todayIso()}
          className="input input-bordered w-full"
          {...register("preferredDate", {
            required: "Please select a preferred date",
          })}
        />

        {errors.preferredDate && (
          <p className="text-xs text-error">
            {errors.preferredDate.message as string}
          </p>
        )}

        <div className="grid gap-3 md:grid-cols-2">
          {slots.map((slot) => (
            <label key={slot} className="cursor-pointer">
              <input
                type="radio"
                value={slot}
                className="peer hidden"
                {...register("preferredTime", {
                  required: "Please select a preferred time slot",
                })}
              />

              <div
                className="
                                rounded-lg
                                border
                                p-3
                                text-center
                                peer-checked:border-primary
                                peer-checked:bg-primary/10
                                "
              >
                {slot}
              </div>
            </label>
          ))}
        </div>

        {errors.preferredTime && (
          <p className="text-xs text-error">
            {errors.preferredTime.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default SchedulePicker;
