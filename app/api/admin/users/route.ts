import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, phone: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(users);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ message: "Missing user id" }, { status: 400 });
  }
  await prisma.user.delete({ where: { id } });
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, phone: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(users);
} 