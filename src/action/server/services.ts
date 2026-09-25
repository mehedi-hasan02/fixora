"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "../../lib/prisma";

// Service categories rarely change (no admin UI for them yet), so cache for
// 5 minutes. Once Manage Categories is built, mutations there should call
// revalidateTag("service-categories") to bust this immediately.
export const getServiceCategories = unstable_cache(
  async () => {
    return prisma.serviceCategory.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
  },
  ["service-categories"],
  { revalidate: 300, tags: ["service-categories"] }
);

export const getServiceCategoryById = unstable_cache(
  async (id: string) => {
    return prisma.serviceCategory.findUnique({
      where: { id },
    });
  },
  ["service-category-by-id"],
  { revalidate: 300, tags: ["service-categories"] }
);

// Public showcase counters — a short staleness window is an acceptable
// trade-off for cutting DB round trips on the homepage.
export const getPublicStats = unstable_cache(
  async () => {
    const [completedServices, happyCustomers, serviceCategories, totalRequests] =
      await Promise.all([
        prisma.serviceRequest.count({ where: { status: "COMPLETED" } }),
        prisma.user.count({ where: { role: "USER" } }),
        prisma.serviceCategory.count({ where: { isActive: true } }),
        prisma.serviceRequest.count(),
      ]);

    return { completedServices, happyCustomers, serviceCategories, totalRequests };
  },
  ["public-stats"],
  { revalidate: 60, tags: ["public-stats"] }
);
