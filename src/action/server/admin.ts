"use server";

import { prisma } from "../../lib/prisma";
import { requireAdmin } from "../../lib/auth";
import { canTransition, type RequestStatus } from "../../lib/requestStatus";

export const getAllRequests = async () => {
  await requireAdmin();

  return prisma.serviceRequest.findMany({
    include: { category: true, user: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getAdminDashboardStats = async () => {
  await requireAdmin();

  const [
    totalRequests,
    pending,
    active,
    completed,
    closed,
    totalUsers,
    totalCategories,
    recentRequests,
  ] = await Promise.all([
    prisma.serviceRequest.count(),
    prisma.serviceRequest.count({
      where: { status: { in: ["PENDING", "REVIEWING"] } },
    }),
    prisma.serviceRequest.count({
      where: { status: { in: ["APPROVED", "SCHEDULED", "IN_PROGRESS"] } },
    }),
    prisma.serviceRequest.count({ where: { status: "COMPLETED" } }),
    prisma.serviceRequest.count({
      where: { status: { in: ["CANCELLED", "REJECTED"] } },
    }),
    prisma.user.count({ where: { role: "USER" } }),
    prisma.serviceCategory.count({ where: { isActive: true } }),
    prisma.serviceRequest.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { category: true, user: true },
    }),
  ]);

  return {
    totalRequests,
    pending,
    active,
    completed,
    closed,
    totalUsers,
    totalCategories,
    recentRequests,
  };
};

export const getAdminRequestById = async (id: string) => {
  await requireAdmin();

  return prisma.serviceRequest.findUnique({
    where: { id },
    include: {
      category: true,
      user: true,
      images: true,
      statusHistory: { orderBy: { createdAt: "asc" }, include: { changedBy: true } },
    },
  });
};

type UpdateRequestStatusInput = {
  requestId: string;
  status: RequestStatus;
  note?: string;
  estimatedPrice?: number;
  finalPrice?: number;
  scheduledAt?: string;
};

export const updateRequestStatus = async (input: UpdateRequestStatusInput) => {
  const admin = await requireAdmin();

  const { requestId, status, note, estimatedPrice, finalPrice, scheduledAt } = input;

  const existing = await prisma.serviceRequest.findUnique({
    where: { id: requestId },
  });

  if (!existing) {
    return { success: false as const, error: "Request not found." };
  }

  if (!canTransition(existing.status, status)) {
    return {
      success: false as const,
      error: `Cannot change status from ${existing.status} to ${status}.`,
    };
  }

  await prisma.serviceRequest.update({
    where: { id: requestId },
    data: {
      status,
      ...(estimatedPrice !== undefined ? { estimatedPrice } : {}),
      ...(finalPrice !== undefined ? { finalPrice } : {}),
      ...(scheduledAt ? { scheduledAt: new Date(scheduledAt) } : {}),
      statusHistory: {
        create: {
          status,
          note,
          changedById: Number(admin.id),
        },
      },
    },
  });

  return { success: true as const };
};
