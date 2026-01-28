// File: app/api/mobil/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";


//const prisma = new PrismaClient();

// FUNGSI UNTUK MENGAMBIL SEMUA MOBIL (GET)
export async function GET() {
  try {
    const cars = await prisma.car.findMany({
      orderBy: {
        id: "desc", // Menampilkan data terbaru di paling atas
      },
    });
    return NextResponse.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { message: "Error fetching cars" },
      { status: 500 }
    );
  }
}

// FUNGSI UNTUK MENAMBAH MOBIL BARU (POST)
export async function POST(request: Request) {
  try {
    const data = await request.formData();

    const name = data.get("name") as string;
    const price = data.get("price") as string;
    const category = data.get("category") as string;
    const content = data.get("content") as string;
    const year = data.get("year") as string;
    const seats = data.get("seats") as string;
    const transmission = data.get("transmission") as string;
    const imageFile = data.get("image") as File;
    const servicesJson = data.get("services") as string;

    if (!name || !price || !category || !imageFile) {
      return NextResponse.json(
        { message: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueFileName = Date.now() + "_" + imageFile.name;
    const filePath = path.join(process.cwd(), "public/uploads", uniqueFileName);
    
    await writeFile(filePath, buffer);
    
    const imageUrlForDb = `/uploads/${uniqueFileName}`;

    // Parse services dari JSON
    let services = [];
    if (servicesJson) {
      try {
        services = JSON.parse(servicesJson);
      } catch (e) {
        console.error("Error parsing services:", e);
      }
    }

    const newCar = await prisma.car.create({
      data: {
        name: name,
        price: price,
        category: category,
        content: content || "",
        year: year ? parseInt(year) : null,
        seats: seats ? parseInt(seats) : null,
        transmission: transmission || "",
        image: imageUrlForDb,
        services: {
          create: services.map((service: { type: string; price: string; description: string; }) => ({
            type: service.type,
            price: service.price,
            description: service.description,
          }))
        }
      },
      include: { services: true }
    });

    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    console.error("Error creating car:", error);
    return NextResponse.json(
      { message: "Error creating car" },
      { status: 500 }
    );
  }
}

