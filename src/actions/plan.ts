"use server";
import prisma from "@/lib/prisma";

export async function createPlan(formData: FormData) {
  await prisma.plan.create({
    data: {
      money: Number(formData.get("money")),
      tagId: Number(formData.get("tagId")),
    },
  });
}

export async function delPlan(formData: FormData) {
  await prisma.plan.delete({ where: { id: Number(formData.get("id")) } });
}
