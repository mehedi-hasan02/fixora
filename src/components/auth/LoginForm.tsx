"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { fadeInUp, fieldTransition } from "@/lib/motion";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const route = useRouter();
  const params = useSearchParams();
  const callback = params.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: callback,
      });

      if (result?.ok && !result.error) {
        toast.success("Login successful");
        route.push(callback);
      } else {
        toast.error("Invalid email or password");
      }
    } catch {
      toast.error("Something went wrong");
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
      {/* Logo / Brand */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg">
            F
          </div>

          <span className="text-2xl font-bold text-primary">Fixora</span>
        </Link>

        <h1 className="mt-8 text-3xl font-bold text-primary">Welcome back</h1>

        <p className="mt-2 text-sm text-muted">
          Sign in to your account to continue
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8">
        {/* Google Login */}
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
                    ? "border-error focus:ring-error/20"
                    : "border-border focus:border-primary focus:ring-primary/20"
                } bg-card pl-11 pr-4 text-sm text-primary outline-none focus:ring-4 transition`}
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
                placeholder="Enter your password"
                className={`w-full h-12 rounded-xl border ${
                  errors.password
                    ? "border-error focus:ring-error/20"
                    : "border-border focus:border-primary focus:ring-primary/20"
                } bg-card pl-11 pr-12 text-sm text-primary outline-none focus:ring-4 transition`}
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
                className="absolute right-4 top-1/2 text-muted hover:text-text transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
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

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 rounded border-border accent-primary"
              {...register("remember")}
            />

            <label
              htmlFor="remember"
              className="text-sm text-muted cursor-pointer"
            >
              Remember me
            </label>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02 } : undefined}
            whileTap={!isSubmitting ? { scale: 0.97 } : undefined}
            className="group w-full h-12 rounded-xl bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}

            {!isSubmitting && (
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            )}
          </motion.button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-muted mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-muted mt-6">
        By continuing, you agree to our{" "}
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

export default LoginForm;
