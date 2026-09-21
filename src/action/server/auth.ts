"use server";

import { prisma } from "../../lib/prisma";
import { uploadImage } from "../../lib/cloudinary";
import bcrypt from "bcryptjs";

interface UserPayload {
  name: string;
  email: string;
  password: string;
  image?: File;
}

interface LoginUser {
  email: string;
  password: string;
}

export const postUser = async (payload: UserPayload) => {
  const { name, email, password, image } = payload;

  if (!name || !email || !password) {
    return false;
  }

  const isExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isExist) return false;

  const imageUrl =
    image && image.size > 0 ? await uploadImage(image, "fixora/users") : null;

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: await bcrypt.hash(password, 10),
      image: imageUrl,
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
    image: user.image,
    role: user.role,
  };
};
