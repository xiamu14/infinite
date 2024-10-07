"use server";
import prisma from "../lib/prisma";

export async function createTag(formData: FormData) {
  await prisma?.tag.create({
    data: {
      title: formData.get("title") as string,
    },
  });
}
