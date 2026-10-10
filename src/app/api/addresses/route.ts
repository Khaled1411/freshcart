import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req: req })

  if (!token) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 })
  }

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
    headers: {
      token: token.token,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    return NextResponse.json({ message: 'failed' }, { status: response.status })
  }

  const payload = await response.json()
  return NextResponse.json(payload)
}
