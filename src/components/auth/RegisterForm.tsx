"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUpload,
  FiUser,
} from "react-icons/fi";
import { postUser } from "../../action/server/auth";
import { toast } from "react-toastify";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  image: FileList;
}

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (user: RegisterFormData) => {
    try {
      const res = await postUser(user);
      if (res) {
        toast.success("User create successfull");
        reset();
      }
    } catch (errors) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
            A
          </div>

          <span className="text-2xl font-bold text-slate-900">AppName</span>
        </Link>

        <h1 className="mt-8 text-3xl font-bold text-slate-900">
          Create an account
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Create your account to get started
        </p>
      </div>

      {/* Register Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
        {/* Google */}
        <button
          type="button"
          className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="text-xs text-slate-400 uppercase">
            or continue with email
          </span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Full name
            </label>

            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className={`w-full h-12 rounded-xl border ${
                  errors.name
                    ? "border-red-400"
                    : "border-slate-300 focus:border-slate-900"
                } bg-white pl-11 pr-4 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-slate-100 transition`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
            </div>

            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Email address
            </label>

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`w-full h-12 rounded-xl border ${
                  errors.email
                    ? "border-red-400"
                    : "border-slate-300 focus:border-slate-900"
                } bg-white pl-11 pr-4 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-slate-100 transition`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </div>

            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Password
            </label>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className={`w-full h-12 rounded-xl border ${
                  errors.password
                    ? "border-red-400"
                    : "border-slate-300 focus:border-slate-900"
                } bg-white pl-11 pr-12 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-slate-100 transition`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Profile image
            </label>

            <div className="flex items-center gap-4">
              {/* Preview */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Profile preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <FiUser className="absolute inset-0 m-auto text-2xl text-slate-400" />
                )}
              </div>

              {/* Upload */}
              <label
                htmlFor="image"
                className="flex-1 h-12 border border-dashed border-slate-300 rounded-xl flex items-center justify-center gap-2 text-sm text-slate-500 hover:bg-slate-50 hover:border-slate-400 cursor-pointer transition"
              >
                <FiUpload />
                Upload profile image
                <input
                  id="image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  {...register("image", {
                    onChange: handleImageChange,
                  })}
                />
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group w-full h-12 rounded-xl bg-slate-900 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-[0.99] transition disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create account"}

            {!isSubmitting && (
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </form>

        {/* Login */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-slate-900 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Terms */}
      <p className="text-center text-xs text-slate-400 mt-6">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-slate-600">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-slate-600">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default RegisterForm;
