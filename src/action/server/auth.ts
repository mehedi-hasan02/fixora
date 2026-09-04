"use server";

import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";

interface UserPayload {
  name: string;
  email: string;
  password: string;
  profileImage?: string;
}

interface LoginUser {
  email: string;
  password: string;
}

export const postUser = async (payload: UserPayload) => {
  const { name, email, password } = payload;

  if (!name || !email || !password) {
    return false;
  }

  const isExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isExist) return false;

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: await bcrypt.hash(password, 10),
    },
  });

  return newUser;
};

export const loginUser = async (payload: LoginUser) => {
  const { email, password } = payload;

  if (!email || !password) return false;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return null;

  return {
    id: user.id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
};
