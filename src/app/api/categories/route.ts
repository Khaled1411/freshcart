import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')

  if (!response.ok) {
    return NextResponse.json({ message: 'failed' }, { status: response.status })
  }

  const payload = await response.json()
  return NextResponse.json(payload)
}
