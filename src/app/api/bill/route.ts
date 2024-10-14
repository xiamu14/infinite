import prisma from "@/lib/prisma";
import { Pipe } from "d-pipe";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: NextRequest) {
  const month = request.nextUrl.searchParams.get("month");
  const tagId = request.nextUrl.searchParams.get("tag");
  const schema = new Pipe({
    include: {
      tag: true,
      account: true,
    },
  });
  if (month || tagId) {
    const where: Record<string, any> = { AND: [] };
    if (month) {
      where.AND.push({ date: { gte: new Date(`${month}-01 00:00:00`) } });
      where.AND.push({ date: { lte: new Date(`${month}-31 23:59:59`) } });
    }
    if (tagId) {
      where.AND.push({ tagId: Number(tagId) });
    }
    schema.add("where", () => where);
  }
  console.log("schema", JSON.stringify(schema.data, null, "\t"));

  try {
    const data = await prisma.bill.findMany(schema.data);
    return Response.json({ data });
  } catch (error) {
    return Response.json({ data: [] });
  }
}
