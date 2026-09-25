"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ServerCrash, RotateCw, ArrowLeft } from "lucide-react";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-error/10 text-error">
          <ServerCrash className="size-8" />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-error">
          Something Went Wrong
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-text">
          We hit a snag
        </h1>
        <p className="mt-3 text-muted">
          An unexpected error occurred while loading this page. Please try
          again.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-muted/70">
            Error reference: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button onClick={reset} className="btn btn-primary">
            <RotateCw className="size-4" />
            Try Again
          </button>

          <Link href="/" className="btn btn-outline">
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Error;
