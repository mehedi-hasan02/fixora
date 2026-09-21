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
