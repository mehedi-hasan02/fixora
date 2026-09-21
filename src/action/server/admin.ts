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
