"use server";
import prisma from "@/lib/prisma";

export async function createAccount(formData: FormData) {
  await prisma.account.create({
    data: {
      title: formData.get("title") as string,
      balance: Number(formData.get("balance")),
      note: formData.get("note") as string,
    },
  });
}

export async function delAccount(formData: FormData) {
  await prisma.account.delete({ where: { id: Number(formData.get("id")) } });
}
