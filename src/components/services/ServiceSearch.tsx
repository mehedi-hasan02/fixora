"use client";

import { Search } from "lucide-react";

const ServiceSearch = () => {
  return (
    <div className="mx-auto mt-10 flex max-w-2xl items-center rounded-2xl border bg-white p-2 shadow-lg shadow-slate-200/60">
      <Search className="ml-4 h-5 w-5 shrink-0 text-slate-400" />

      <input
        type="text"
        placeholder="Search for a service..."
        className="h-12 flex-1 bg-transparent px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />

      <button className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
        Search
      </button>
    </div>
  );
};

export default ServiceSearch;
