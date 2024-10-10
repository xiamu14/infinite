"use server";
import prisma from "@/lib/prisma";

export async function createIncome(formData: FormData) {
  await prisma.income.create({
    data: {
      accountId: Number(formData.get("accountId")),
      money: Number(formData.get("money")),
      note: formData.get("note") as string,
    },
  });
}

export async function delIncome(formData: FormData) {
  await prisma.income.delete({ where: { id: Number(formData.get("id")) } });
}
