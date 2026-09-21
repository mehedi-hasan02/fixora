"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

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
    <div className="w-full max-w-md">
      {/* Logo / Brand */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
            F
          </div>

          <span className="text-2xl font-bold text-slate-900">Fixora</span>
        </Link>

        <h1 className="mt-8 text-3xl font-bold text-slate-900">Welcome back</h1>

        <p className="mt-2 text-sm text-slate-500">
          Sign in to your account to continue
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
        {/* Google Login */}
        <button
          type="button"
          disabled
          title="Google sign-in coming soon"
          className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-400 cursor-not-allowed opacity-60 transition"
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
                    ? "border-red-400 focus:ring-red-100"
                    : "border-slate-300 focus:border-slate-900 focus:ring-slate-100"
                } bg-white pl-11 pr-4 text-sm text-slate-900 outline-none focus:ring-4 transition`}
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
                placeholder="Enter your password"
                className={`w-full h-12 rounded-xl border ${
                  errors.password
                    ? "border-red-400 focus:ring-red-100"
                    : "border-slate-300 focus:border-slate-900 focus:ring-slate-100"
                } bg-white pl-11 pr-12 text-sm text-slate-900 outline-none focus:ring-4 transition`}
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
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

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 rounded border-slate-300 accent-slate-900"
              {...register("remember")}
            />

            <label
              htmlFor="remember"
              className="text-sm text-slate-600 cursor-pointer"
            >
              Remember me
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group w-full h-12 rounded-xl bg-slate-900 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-[0.99] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}

            {!isSubmitting && (
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-slate-900 hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-slate-400 mt-6">
        By continuing, you agree to our{" "}
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

export default LoginForm;
