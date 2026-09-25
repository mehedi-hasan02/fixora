"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";

import { updateRequestStatus } from "@/action/server/admin";
import {
  ALLOWED_TRANSITIONS,
  STATUS_LABELS,
  type RequestStatus,
} from "@/lib/requestStatus";

type FormValues = {
  status: RequestStatus | "";
  note: string;
  estimatedPrice: string;
  finalPrice: string;
  scheduledAt: string;
};

type Props = {
  requestId: string;
  currentStatus: RequestStatus;
  estimatedPrice: number | null;
  finalPrice: number | null;
};

const AdminStatusForm = ({
  requestId,
  currentStatus,
  estimatedPrice,
  finalPrice,
}: Props) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      status: "",
      note: "",
      estimatedPrice: estimatedPrice?.toString() ?? "",
      finalPrice: finalPrice?.toString() ?? "",
      scheduledAt: "",
    },
  });

  const nextOptions = ALLOWED_TRANSITIONS[currentStatus];
  const selectedStatus = useWatch({ control, name: "status" });
  const isCompleting = selectedStatus === "COMPLETED";

  const onSubmit = async (data: FormValues) => {
    if (!data.status) {
      toast.error("Please select a status to move this request to.");
      return;
    }

    if (data.status === "COMPLETED" && !data.finalPrice && !finalPrice) {
      toast.error("Please enter the final price before marking this request as completed.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await updateRequestStatus({
        requestId,
        status: data.status,
        note: data.note || undefined,
        estimatedPrice: data.estimatedPrice
          ? Number(data.estimatedPrice)
          : undefined,
        finalPrice: data.finalPrice ? Number(data.finalPrice) : undefined,
        scheduledAt: data.scheduledAt || undefined,
      });

      if (result.success) {
        toast.success("Request updated");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (nextOptions.length === 0) {
    return (
      <p className="text-sm text-muted">
        This request is in a final state ({STATUS_LABELS[currentStatus]}) and
        can no longer be updated.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Move to status</label>

        <select
          className="select select-bordered mt-2 w-full"
          {...register("status", { required: true })}
        >
          <option value="">Select next status</option>
          {nextOptions.map((option) => (
            <option key={option} value={option}>
              {STATUS_LABELS[option]}
            </option>
          ))}
        </select>

        {errors.status && (
          <p className="mt-1 text-xs text-error">Please select a status.</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Estimated Price (৳)</label>
          <input
            type="number"
            className="input input-bordered mt-2 w-full"
            {...register("estimatedPrice")}
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Final Price (৳){isCompleting && <span className="text-error"> *</span>}
          </label>
          <input
            type="number"
            className="input input-bordered mt-2 w-full"
            {...register("finalPrice")}
          />
          {isCompleting && !finalPrice && (
            <p className="mt-1 text-xs text-muted">
              Required to mark this request as completed.
            </p>
          )}
        </div>
      </div>

      {selectedStatus === "SCHEDULED" && (
        <div>
          <label className="text-sm font-medium">Confirmed Schedule</label>
          <input
            type="datetime-local"
            className="input input-bordered mt-2 w-full"
            {...register("scheduledAt")}
          />
        </div>
      )}

      <div>
        <label className="text-sm font-medium">Note (optional)</label>
        <textarea
          rows={3}
          className="textarea textarea-bordered mt-2 w-full"
          {...register("note")}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary disabled:opacity-60"
      >
        {submitting ? "Updating..." : "Update Request"}
      </button>
    </form>
  );
};

export default AdminStatusForm;
