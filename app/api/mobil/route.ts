import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET semua mobil
export async function GET() {
  const cars = await prisma.car.findMany();
  return NextResponse.json(cars);
}

// POST tambah mobil
export async function POST(req: Request) {
  try {
    const body = await req.json(); // body: { name, price, image }
    const car = await prisma.car.create({ data: body });
    return NextResponse.json(car);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
  