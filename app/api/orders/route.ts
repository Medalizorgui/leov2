import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { items } = body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ message: "No items provided" }, { status: 400 });
  }

  // Find user by email
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Create order and items
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      items: {
        create: items.map((item: any) => ({
          productId: item.productId,
          productName: item.name,
          productType: item.productType || "unknown",
          size: item.options?.size || null,
          image: item.image || null,
          link: item.options?.customLink || null,
          quantity: item.quantity,
          options: item.options || {},
        })),
      },
    },
    include: { items: true },
  });

  return NextResponse.json(order, { status: 201 });
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Find user by email
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Get user's orders with items
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
} 