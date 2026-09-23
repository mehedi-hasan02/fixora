"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import type { ServiceCategoryModel } from "../../../generated/prisma/models";
import MotionPress from "@/components/motion/MotionPress";

type Props = {
  categories: ServiceCategoryModel[];
};

const HeroSearch = ({ categories }: Props) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (categoryId) {
      router.push(`/services/${categoryId}`);
      return;
    }

    const match = categories.find((category) =>
      category.name.toLowerCase().includes(query.trim().toLowerCase())
    );

    router.push(match ? `/services/${match.id}` : "/services");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-xl sm:flex-row sm:items-center"
    >
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="rounded-xl bg-background px-3 py-2.5 text-sm text-text outline-none sm:bg-transparent"
      >
        <option value="">Select a service</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <div className="hidden h-6 w-px bg-border sm:block" />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a service..."
        className="flex-1 bg-transparent px-3 py-2.5 text-sm text-text outline-none placeholder:text-muted"
      />

      <MotionPress>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover sm:w-auto"
        >
          <Search className="h-4 w-4" />
          Find Service
        </button>
      </MotionPress>
    </form>
  );
};

export default HeroSearch;
