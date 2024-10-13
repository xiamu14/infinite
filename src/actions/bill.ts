"use server";
import prisma from "@/lib/prisma";

export async function createBill(formData: FormData) {
  await prisma.bill.create({
    data: {
      money: Number(formData.get("money")),
      tagId: Number(formData.get("tagId")),
      accountId: Number(formData.get("accountId")),
      date: new Date(formData.get("date") as string),
    },
  });
}

export async function delBill(formData: FormData) {
  try {
    await prisma.bill.delete({ where: { id: Number(formData.get("id")) } });
  } catch (error) {}
}
