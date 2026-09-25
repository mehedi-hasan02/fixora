"use server";

import { prisma } from "../../lib/prisma";
import { requireAdmin } from "../../lib/auth";
import {
  canTransition,
  REQUEST_STATUSES,
  type RequestStatus,
} from "../../lib/requestStatus";

type GetAllRequestsFilters = {
  status?: RequestStatus;
  search?: string;
};

export const getAllRequests = async (filters: GetAllRequestsFilters = {}) => {
  await requireAdmin();

  const { status, search } = filters;

  return prisma.serviceRequest.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { user: { name: { contains: search, mode: "insensitive" } } },
              { category: { name: { contains: search, mode: "insensitive" } } },
            ],
          }
        : {}),
    },
    include: { category: true, user: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getAdminDashboardStats = async () => {
  await requireAdmin();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const [
    totalRequests,
    pending,
    active,
    completed,
    closed,
    totalUsers,
    totalCategories,
    totalRevenue,
    recentRequests,
    statusGroups,
    lastWeekRequests,
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
    prisma.serviceRequest.aggregate({
      where: { status: "COMPLETED" },
      _sum: { finalPrice: true },
    }),
    prisma.serviceRequest.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { category: true, user: true },
    }),
    prisma.serviceRequest.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
    prisma.serviceRequest.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
    }),
  ]);

  const statusCounts = Object.fromEntries(
    REQUEST_STATUSES.map((status) => [status, 0])
  ) as Record<RequestStatus, number>;

  for (const group of statusGroups) {
    statusCounts[group.status] = group._count._all;
  }

  const dailyCounts: { date: string; count: number }[] = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date(sevenDaysAgo);
    day.setDate(sevenDaysAgo.getDate() + (6 - i));
    const dayKey = day.toDateString();

    const count = lastWeekRequests.filter(
      (r) => r.createdAt.toDateString() === dayKey
    ).length;

    dailyCounts.push({
      date: day.toLocaleDateString("en-US", { weekday: "short" }),
      count,
    });
  }

  return {
    totalRequests,
    pending,
    active,
    completed,
    closed,
    totalUsers,
    totalCategories,
    totalRevenue: totalRevenue._sum.finalPrice ?? 0,
    recentRequests,
    statusCounts,
    dailyCounts,
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

  const effectiveFinalPrice = finalPrice ?? existing.finalPrice ?? undefined;

  if (status === "COMPLETED" && !effectiveFinalPrice) {
    return {
      success: false as const,
      error: "Final price is required to mark a request as completed.",
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
