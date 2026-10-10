'use server'

import { ActionResult } from "../types/actionResult"

const AUTH_URL = 'https://ecommerce.routemisr.com/api/v1/auth'

// step 1: send the reset code to the user's email
export async function forgotPassword(email: string): Promise<ActionResult> {
  try {
    const response = await fetch(`${AUTH_URL}/forgotPasswords`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    })
    const payload = await response.json().catch(() => ({}))
    return {
      success: response.ok,
      message: payload.message ?? (response.ok ? 'Reset code sent to your email' : 'Something went wrong'),
    }
  } catch (error) {
    return { success: false, message: 'Network error' }
  }
}

// step 2: verify the code
export async function verifyResetCode(resetCode: string): Promise<ActionResult> {
  try {
    const response = await fetch(`${AUTH_URL}/verifyResetCode`, {
      method: 'POST',
      body: JSON.stringify({ resetCode }),
      headers: { 'Content-Type': 'application/json' },
    })
    const payload = await response.json().catch(() => ({}))
    return {
      success: response.ok,
      message: payload.message ?? (response.ok ? 'Code verified' : 'Reset code is invalid or has expired'),
    }
  } catch (error) {
    return { success: false, message: 'Network error' }
  }
}

// step 3: set the new password
export async function resetPassword(email: string, newPassword: string): Promise<ActionResult> {
  try {
    const response = await fetch(`${AUTH_URL}/resetPassword`, {
      method: 'PUT',
      body: JSON.stringify({ email, newPassword }),
      headers: { 'Content-Type': 'application/json' },
    })
    const payload = await response.json().catch(() => ({}))
    return {
      success: response.ok,
      message: payload.message ?? (response.ok ? 'Password changed' : 'Something went wrong'),
    }
  } catch (error) {
    return { success: false, message: 'Network error' }
  }
}
