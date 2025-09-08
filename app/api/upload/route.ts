import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const car = await prisma.car.create({ data: body });
  return NextResponse.json(car);
}

export async function GET() {
  const cars = await prisma.car.findMany();
  return NextResponse.json(cars);
}
