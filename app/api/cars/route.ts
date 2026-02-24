import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Mark route as dynamic to avoid static prerendering issues
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Use request.nextUrl to access search params without making the route
    // treated as dynamic due to `new URL(request.url)` usage.
    const { searchParams } = request.nextUrl
    const category = searchParams.get('category')

    let where = {}
    
    if (category && category.toLowerCase() !== 'premium') {
      where = { category: { contains: category, mode: 'insensitive' } }
    } else if (category && category.toLowerCase() === 'premium') {
      // Filter untuk kategori premium (SUV & Premium)
      where = { category: { contains: 'Premium', mode: 'insensitive' } }
    }
    
    const cars = await prisma.car.findMany({
      where,
      orderBy: { id: 'desc' },
    })

    return NextResponse.json(cars)
  } catch (error) {
    console.error('Error fetching cars:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cars' },
      { status: 500 }
    )
  }
}