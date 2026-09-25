import Link from "next/link";
import { SearchX, ArrowLeft, LayoutGrid } from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <SearchX className="size-8" />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-primary">
          404 Error
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-text">
          Page Not Found
        </h1>
        <p className="mt-3 text-muted">
          The page you are looking for doesn&apos;t exist or may have been
          moved.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>

          <Link href="/services" className="btn btn-outline">
            <LayoutGrid className="size-4" />
            Browse Services
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
