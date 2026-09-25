import Link from "next/link";
import { SearchX } from "lucide-react";

const DashboardNotFound = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <SearchX className="size-8" />
        </div>

        <h1 className="mt-6 text-xl font-bold text-text">Not Found</h1>
        <p className="mt-2 text-sm text-muted">
          The page you are looking for doesn&apos;t exist or may have been
          removed.
        </p>

        <Link href="/dashboard" className="btn btn-primary mt-6">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default DashboardNotFound;
