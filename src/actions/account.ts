"use server";
import prisma from "@/lib/prisma";
import { AccountStatus } from "@prisma/client";

export async function createAccount(formData: FormData) {
  await prisma.account.create({
    data: {
      title: formData.get("title") as string,
      balance: Number(formData.get("balance")),
      note: formData.get("note") as string,
    },
  });
}

export async function updateAccount(formData: FormData) {
  await prisma.account.update({
    where: { id: Number(formData.get("id")) },
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

export async function stopAccount(id: number) {
  await prisma.account.update({
    where: { id },
    data: {
      status: AccountStatus.INACTIVE,
    },
  });
}
