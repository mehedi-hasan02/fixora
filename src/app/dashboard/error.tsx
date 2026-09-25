"use client";

import { useEffect } from "react";
import { ServerCrash, RotateCw } from "lucide-react";

const DashboardError = ({
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
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-error/10 text-error">
          <ServerCrash className="size-8" />
        </div>

        <h1 className="mt-6 text-xl font-bold text-text">
          Couldn&apos;t load this page
        </h1>
        <p className="mt-2 text-sm text-muted">
          Something went wrong while fetching your data. Please try again.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-muted/70">
            Error reference: {error.digest}
          </p>
        )}

        <button onClick={reset} className="btn btn-primary mt-6">
          <RotateCw className="size-4" />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default DashboardError;
