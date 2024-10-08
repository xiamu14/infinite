"use server";
import prisma from "@/lib/prisma";

export async function createTag(formData: FormData) {
  await prisma.tag.create({
    data: {
      title: formData.get("title") as string,
    },
  });
}

export async function delTag(formData: FormData) {
  await prisma.tag.delete({ where: { id: Number(formData.get("id")) } });
}
