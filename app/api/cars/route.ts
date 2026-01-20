import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
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
