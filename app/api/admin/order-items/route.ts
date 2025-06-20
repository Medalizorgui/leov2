import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url!);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ message: "Missing id" }, { status: 400 });
  const item = await prisma.orderItem.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();
  // Required: orderId, productId, productName, productType, quantity
  if (!data.orderId || !data.productId || !data.productName || !data.productType || !data.quantity) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }
  const item = await prisma.orderItem.create({ data });
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();
  if (!data.id) return NextResponse.json({ message: "Missing id" }, { status: 400 });
  const item = await prisma.orderItem.update({ where: { id: data.id }, data });
  return NextResponse.json(item);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  if (!id) return NextResponse.json({ message: "Missing id" }, { status: 400 });
  await prisma.orderItem.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 