"use client";

// src/components/profile/ProfileForm.tsx

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { updateUserName } from "@/action/server/users";

type FormValues = {
  name: string;
};

type Props = {
  name: string;
  email: string;
};

const ProfileForm = ({ name, email }: Props) => {
  const { update } = useSession();
  const [avatarName, setAvatarName] = useState(name);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    defaultValues: { name },
  });

  const onSubmit = async ({ name: newName }: FormValues) => {
    const result = await updateUserName(newName);

    if (result.success) {
      setAvatarName(result.name);
      await update({ name: result.name });
      toast.success("Profile updated successfully");
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="rounded-2xl bg-card p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-white">
          {avatarName?.[0]?.toUpperCase() ?? "U"}
        </div>

        <div className="min-w-0">
          <p className="truncate text-lg font-bold text-text">{avatarName}</p>
          <p className="truncate text-sm text-muted">{email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-text">Full Name</label>

          <input
            type="text"
            className="input input-bordered mt-2 w-full"
            {...register("name", {
              required: "Please enter your name",
              maxLength: { value: 80, message: "Name is too long" },
            })}
          />

          {errors.name && (
            <p className="mt-1 text-xs text-error">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-text">Email</label>

          <input
            type="email"
            value={email}
            disabled
            className="input input-bordered mt-2 w-full disabled:text-muted"
          />

          <p className="mt-1 text-xs text-muted">
            Contact support to change your email address.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="btn btn-primary w-full disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
