"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
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
import { validateImageFile } from "../../lib/imageValidation";
import { fadeInUp, fieldTransition } from "../../lib/motion";
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
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const validationError = validateImageFile(file);

    if (validationError) {
      toast.error(validationError);
      resetField("image");
      setPreview(null);
      return;
    }

    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (user: RegisterFormData) => {
    try {
      const res = await postUser({
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image?.[0],
      });

      if (res) {
        toast.success("Account created successfully");
        reset();
        setPreview(null);
      } else {
        toast.error("An account with this email already exists");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };
  return (
    <motion.div
      className="w-full max-w-md"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={fieldTransition}
    >
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg">
            F
          </div>

          <span className="text-2xl font-bold text-primary">Fixora</span>
        </Link>

        <h1 className="mt-8 text-3xl font-bold text-primary">
          Create an account
        </h1>

        <p className="mt-2 text-sm text-muted">
          Create your account to get started
        </p>
      </div>

      {/* Register Card */}
      <div className="bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8">
        {/* Google */}
        <button
          type="button"
          disabled
          title="Google sign-in coming soon"
          className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-border bg-card text-sm font-medium text-muted cursor-not-allowed opacity-60 transition"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px flex-1 bg-border" />

          <span className="text-xs text-muted uppercase">
            or continue with email
          </span>

          <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-text mb-2"
            >
              Full name
            </label>

            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />

              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className={`w-full h-12 rounded-xl border ${
                  errors.name
                    ? "border-error"
                    : "border-border focus:border-primary"
                } bg-card pl-11 pr-4 text-sm text-primary outline-none focus:ring-4 focus:ring-primary/20 transition`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
            </div>

            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-1.5 text-xs text-error"
                >
                  {errors.name.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text mb-2"
            >
              Email address
            </label>

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`w-full h-12 rounded-xl border ${
                  errors.email
                    ? "border-error"
                    : "border-border focus:border-primary"
                } bg-card pl-11 pr-4 text-sm text-primary outline-none focus:ring-4 focus:ring-primary/20 transition`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </div>

            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-1.5 text-xs text-error"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text mb-2"
            >
              Password
            </label>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className={`w-full h-12 rounded-xl border ${
                  errors.password
                    ? "border-error"
                    : "border-border focus:border-primary"
                } bg-card pl-11 pr-12 text-sm text-primary outline-none focus:ring-4 focus:ring-primary/20 transition`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                whileTap={{ scale: 0.85 }}
                style={{ y: "-50%" }}
                className="absolute right-4 top-1/2 text-muted hover:text-text"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </motion.button>
            </div>

            <AnimatePresence>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-1.5 text-xs text-error"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Profile image
            </label>

            <div className="flex items-center gap-4">
              {/* Preview */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-background border border-border flex-shrink-0">
                <AnimatePresence mode="wait">
                  {preview ? (
                    <motion.img
                      key="preview"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      src={preview}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FiUser
                      key="placeholder"
                      className="absolute inset-0 m-auto text-2xl text-muted"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Upload */}
              <label
                htmlFor="image"
                className="flex-1 h-12 border border-dashed border-border rounded-xl flex items-center justify-center gap-2 text-sm text-muted hover:bg-background hover:border-muted cursor-pointer transition"
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
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02 } : undefined}
            whileTap={!isSubmitting ? { scale: 0.97 } : undefined}
            className="group w-full h-12 rounded-xl bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create account"}

            {!isSubmitting && (
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            )}
          </motion.button>
        </form>

        {/* Login */}
        <p className="text-center text-sm text-muted mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Terms */}
      <p className="text-center text-xs text-muted mt-6">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-text">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-text">
          Privacy Policy
        </Link>
        .
      </p>
    </motion.div>
  );
};

export default RegisterForm;
