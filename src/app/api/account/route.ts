import prisma from "@/lib/prisma";
import { AccountStatus } from "@prisma/client";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  try {
    const data = await prisma.account.findMany({
      where: {
        status: AccountStatus.ACTIVE,
      },
    });
    return Response.json({ data });
  } catch (error) {
    return Response.json({ data: [] });
  }
}
