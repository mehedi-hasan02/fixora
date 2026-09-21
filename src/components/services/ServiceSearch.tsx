"use client";

import { Search } from "lucide-react";

const ServiceSearch = () => {
  return (
    <div className="mx-auto mt-10 flex max-w-2xl items-center rounded-2xl border bg-card p-2 shadow-lg shadow-border/60">
      <Search className="ml-4 h-5 w-5 shrink-0 text-muted" />

      <input
        type="text"
        placeholder="Search for a service..."
        className="h-12 flex-1 bg-transparent px-4 text-sm text-primary outline-none placeholder:text-muted"
      />

      <button className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover">
        Search
      </button>
    </div>
  );
};

export default ServiceSearch;
