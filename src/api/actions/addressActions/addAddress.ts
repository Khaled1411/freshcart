'use server'

import { getTokenFun } from "@/utilities/getTokenData"
import { ActionResult } from "../../types/actionResult"

export async function addAddress(data: {
  name: string
  details: string
  phone: string
  city: string
}): Promise<ActionResult> {
  const token = await getTokenFun()
  if (!token) return { success: false, message: 'Unauthorized' }

  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { token: token, 'Content-Type': 'application/json' },
    })
    const payload = await response.json().catch(() => ({}))

    if (!response.ok) {
      return { success: false, message: payload?.message ?? 'Failed to add address' }
    }
    return { success: true, message: payload?.message ?? 'Address added' }
  } catch (error) {
    return { success: false, message: 'Network error' }
  }
}
