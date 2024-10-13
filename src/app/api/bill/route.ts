import prisma from "@/lib/prisma";
import { Pipe } from "d-pipe";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: NextRequest) {
  const month = request.nextUrl.searchParams.get("month");
  const schema = new Pipe({
    include: {
      tag: true,
      account: true,
    },
  });
  if (month) {
    schema.add("where", () => {
      return {
        AND: [
          { date: { gte: new Date(`${month}-01 00:00:00`) } },
          { date: { lte: new Date(`${month}-31 23:59:59`) } },
        ],
      };
    });
  }
  try {
    const data = await prisma.bill.findMany(schema.data);
    return Response.json({ data });
  } catch (error) {
    return Response.json({ data: [] });
  }
}
