"use server";

import { prisma } from "../../lib/prisma";

export const getServiceCategories = async () => {
  return prisma.serviceCategory.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });
};

export const getServiceCategoryById = async (id: string) => {
  return prisma.serviceCategory.findUnique({
    where: { id },
  });
};

export const getPublicStats = async () => {
  const [completedServices, happyCustomers, serviceCategories, totalRequests] =
    await Promise.all([
      prisma.serviceRequest.count({ where: { status: "COMPLETED" } }),
      prisma.user.count({ where: { role: "USER" } }),
      prisma.serviceCategory.count({ where: { isActive: true } }),
      prisma.serviceRequest.count(),
    ]);

  return { completedServices, happyCustomers, serviceCategories, totalRequests };
};
