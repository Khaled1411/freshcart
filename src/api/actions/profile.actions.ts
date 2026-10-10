'use server'

import { getTokenFun } from "@/utilities/getTokenData"
import { ActionResult } from "../types/actionResult"

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1/users'

function errorMessage(
  payload: { errors?: { msg?: string }; message?: string } | undefined,
  fallback: string
) {
  return payload?.errors?.msg ?? payload?.message ?? fallback
}

export async function updateProfile(data: {
  name: string
  email: string
  phone: string
}): Promise<ActionResult> {
  const token = await getTokenFun()
  if (!token) return { success: false, message: 'Unauthorized' }

  try {
    const response = await fetch(`${BASE_URL}/updateMe/`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { token: token, 'Content-Type': 'application/json' },
    })
    const payload = await response.json().catch(() => ({}))

    if (!response.ok) {
      return { success: false, message: errorMessage(payload, 'Failed to update profile') }
    }
    return { success: true, message: 'Profile updated' }
  } catch (error) {
    return { success: false, message: 'Network error' }
  }
}

export async function changePassword(data: {
  currentPassword: string
  password: string
  rePassword: string
}): Promise<ActionResult> {
  const token = await getTokenFun()
  if (!token) return { success: false, message: 'Unauthorized' }

  try {
    const response = await fetch(`${BASE_URL}/changeMyPassword`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { token: token, 'Content-Type': 'application/json' },
    })
    const payload = await response.json().catch(() => ({}))

    if (!response.ok) {
      return { success: false, message: errorMessage(payload, 'Failed to change password') }
    }
    return { success: true, message: 'Password changed' }
  } catch (error) {
    return { success: false, message: 'Network error' }
  }
}
