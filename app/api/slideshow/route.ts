import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

// GET - Ambil slideshow images
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all");

    const slideshows = await prisma.slideshow.findMany({
      ...(all ? {} : { where: { isActive: true } }),
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(slideshows);
  } catch (error) {
    console.error("Error fetching slideshows:", error);
    return NextResponse.json(
      { message: "Error fetching slideshows" },
      { status: 500 }
    );
  }
}

// POST - Upload slideshow image baru
export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const imageFile = data.get("image") as File;

    if (!imageFile) {
      return NextResponse.json(
        { message: "Image file required" },
        { status: 400 }
      );
    }

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "slideshow"
    );
    await mkdir(uploadDir, { recursive: true });

    // Generate filename and save file
    const timestamp = Date.now();
    const filename = `${timestamp}_${imageFile.name}`;
    const filePath = path.join(uploadDir, filename);
    const imageUrlForDb = `/uploads/slideshow/${filename}`;

    const bytes = await imageFile.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    const newSlideshow = await prisma.slideshow.create({
      data: {
        imageUrl: imageUrlForDb,
        isActive: true,
      },
    });

    return NextResponse.json(newSlideshow, { status: 201 });
  } catch (error) {
    console.error("Error uploading slideshow:", error);
    return NextResponse.json(
      { message: "Error uploading slideshow" },
      { status: 500 }
    );
  }
}
