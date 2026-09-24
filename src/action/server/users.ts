"use server";

import { prisma } from "../../lib/prisma";
import { requireUser } from "../../lib/auth";

export const updateUserName = async (name: string) => {
  const user = await requireUser();

  const trimmed = name.trim();

  if (!trimmed) {
    return { success: false as const, error: "Name cannot be empty." };
  }

  await prisma.user.update({
    where: { id: Number(user.id) },
    data: { name: trimmed },
  });

  return { success: true as const, name: trimmed };
};
