// File: app/api/uploads/[...path]/route.ts

import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const MIME_MAP: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
}

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(
  _request: Request,
  { params }: { params: { path?: string[] } },
) {
  const segments = params.path

  if (!segments || segments.length === 0) {
    return NextResponse.json({ message: "File path is required" }, { status: 400 })
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads")
  const requestedPath = path.join(uploadsDir, ...segments)
  const normalizedPath = path.normalize(requestedPath)

  if (!normalizedPath.startsWith(uploadsDir)) {
    return NextResponse.json({ message: "Invalid file path" }, { status: 400 })
  }

  try {
    const fileBuffer = await fs.readFile(normalizedPath)
    const ext = path.extname(normalizedPath).toLowerCase()
    const contentType = MIME_MAP[ext] ?? "application/octet-stream"

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error: any) {
    if (error?.code === "ENOENT") {
      return NextResponse.json({ message: "File not found" }, { status: 404 })
    }

    console.error("Error serving uploaded file:", error)
    return NextResponse.json({ message: "Failed to read file" }, { status: 500 })
  }
}
