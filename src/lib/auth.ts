import { getServerSession } from "next-auth";
import authOptions from "./authOptions";

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) return null;

  return session.user;
};

export const requireUser = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("UNAUTHENTICATED");
  }

  return user;
};

export const requireAdmin = async () => {
  const user = await requireUser();

  if (user.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }

  return user;
};
