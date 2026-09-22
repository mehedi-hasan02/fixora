"use server";

import { prisma } from "../../lib/prisma";
import { uploadImage } from "../../lib/cloudinary";
import { validateImageFile, MAX_REQUEST_IMAGES } from "../../lib/imageValidation";
import { requireUser } from "../../lib/auth";

type CreateServiceRequestInput = {
  categoryId: string;
  title: string;
  description: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  images?: File[];
};

export const createServiceRequest = async (
  input: CreateServiceRequestInput
) => {
  const user = await requireUser();

  if (user.role === "ADMIN") {
    return { success: false as const, error: "Admins cannot submit service requests." };
  }

  const { categoryId, title, description, address, preferredDate, preferredTime, images } =
    input;

  if (
    !categoryId ||
    !title ||
    !description ||
    !address ||
    !preferredDate ||
    !preferredTime
  ) {
    return { success: false as const, error: "Please fill in all required fields." };
  }

  const category = await prisma.serviceCategory.findUnique({
    where: { id: categoryId },
  });

  if (!category || !category.isActive) {
    return { success: false as const, error: "Selected service is not available." };
  }

  const parsedDate = new Date(preferredDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return { success: false as const, error: "Invalid preferred date." };
  }

  const imageFiles = (images ?? []).filter((file) => file.size > 0);

  if (imageFiles.length > MAX_REQUEST_IMAGES) {
    return {
      success: false as const,
      error: `You can upload up to ${MAX_REQUEST_IMAGES} images.`,
    };
  }

  for (const file of imageFiles) {
    const validationError = validateImageFile(file);

    if (validationError) {
      return { success: false as const, error: validationError };
    }
  }

  const imageUrls = await Promise.all(
    imageFiles.map((file) => uploadImage(file, "fixora/requests"))
  );

  const userId = Number(user.id);

  const request = await prisma.serviceRequest.create({
    data: {
      userId,
      categoryId,
      title,
      description,
      address,
      preferredDate: parsedDate,
      preferredTime,
      images: {
        create: imageUrls.map((imageUrl) => ({ imageUrl })),
      },
      statusHistory: {
        create: {
          status: "PENDING",
          note: "Request submitted",
          changedById: userId,
        },
      },
    },
  });

  return { success: true as const, requestId: request.id };
};

export const getUserRequests = async () => {
  const user = await requireUser();

  return prisma.serviceRequest.findMany({
    where: { userId: Number(user.id) },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getDashboardStats = async () => {
  const user = await requireUser();
  const userId = Number(user.id);

  const [total, pending, inProgress, completed] = await Promise.all([
    prisma.serviceRequest.count({ where: { userId } }),
    prisma.serviceRequest.count({
      where: { userId, status: { in: ["PENDING", "REVIEWING"] } },
    }),
    prisma.serviceRequest.count({
      where: { userId, status: { in: ["APPROVED", "SCHEDULED", "IN_PROGRESS"] } },
    }),
    prisma.serviceRequest.count({ where: { userId, status: "COMPLETED" } }),
  ]);

  return { total, pending, inProgress, completed };
};

export const getRequestById = async (id: string) => {
  const user = await requireUser();

  const request = await prisma.serviceRequest.findUnique({
    where: { id },
    include: {
      category: true,
      images: true,
      statusHistory: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!request) return null;

  const isOwner = request.userId === Number(user.id);
  const isAdmin = user.role === "ADMIN";

  if (!isOwner && !isAdmin) {
    throw new Error("FORBIDDEN");
  }

  return request;
};
