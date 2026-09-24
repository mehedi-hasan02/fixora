"use client";

// src/components/requests/wizard/StepSchedule.tsx

import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";

const SLOTS = ["9 AM - 11 AM", "11 AM - 1 PM", "2 PM - 4 PM", "4 PM - 6 PM"];

const todayIso = () => new Date().toISOString().split("T")[0];

const StepSchedule = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold">Preferred Date &amp; Time</h2>

      <div>
        <label className="text-sm font-medium">
          Preferred Date <span className="text-error">*</span>
        </label>

        <input
          type="date"
          min={todayIso()}
          className="input input-bordered mt-2 w-full"
          {...register("preferredDate", {
            required: "Please select a preferred date",
          })}
        />

        {errors.preferredDate && (
          <p className="mt-1 text-xs text-error">
            {errors.preferredDate.message as string}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">
          Preferred Time Slot <span className="text-error">*</span>
        </label>

        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {SLOTS.map((slot) => (
            <label key={slot} className="cursor-pointer">
              <input
                type="radio"
                value={slot}
                className="peer hidden"
                {...register("preferredTime", {
                  required: "Please select a preferred time slot",
                })}
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-lg border border-base-300 p-3 text-center text-sm transition-colors peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:font-semibold peer-checked:text-primary"
              >
                {slot}
              </motion.div>
            </label>
          ))}
        </div>

        {errors.preferredTime && (
          <p className="mt-1 text-xs text-error">
            {errors.preferredTime.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default StepSchedule;
