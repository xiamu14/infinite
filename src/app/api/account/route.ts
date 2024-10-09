import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  try {
    const data = await prisma.account.findMany();
    return Response.json({ data });
  } catch (error) {
    return Response.json({ data: [] });
  }
}
