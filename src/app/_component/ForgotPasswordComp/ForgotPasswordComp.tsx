'use client'
import {
  forgotPassword,
  resetPassword,
  verifyResetCode,
} from '@/api/actions/forgotPassword.actions'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import {
  ForgotEmailData,
  forgotEmailSchema,
  NewPasswordData,
  newPasswordSchema,
  ResetCodeData,
  resetCodeSchema,
} from '@/schema/forgotPasswordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from '../TextField/TextField'

type Step = 'email' | 'code' | 'reset'

export default function ForgotPasswordComp() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')

  const emailForm = useForm<ForgotEmailData>({
    defaultValues: { email: '' },
    resolver: zodResolver(forgotEmailSchema),
  })
  const codeForm = useForm<ResetCodeData>({
    defaultValues: { resetCode: '' },
    resolver: zodResolver(resetCodeSchema),
  })
  const resetForm = useForm<NewPasswordData>({
    defaultValues: { newPassword: '' },
    resolver: zodResolver(newPasswordSchema),
  })

  async function submitEmail(data: ForgotEmailData) {
    const result = await forgotPassword(data.email)
    if (result.success) {
      setEmail(data.email)
      toast.add({ type: 'success', description: result.message })
      setStep('code')
    } else {
      toast.add({ type: 'error', description: result.message })
    }
  }

  async function submitCode(data: ResetCodeData) {
    const result = await verifyResetCode(data.resetCode)
    if (result.success) {
      toast.add({ type: 'success', description: 'Code verified' })
      setStep('reset')
    } else {
      toast.add({ type: 'error', description: result.message })
    }
  }

  async function submitNewPassword(data: NewPasswordData) {
    const result = await resetPassword(email, data.newPassword)
    if (result.success) {
      toast.add({ type: 'success', description: 'Password changed, you can login now' })
      router.push('/login')
    } else {
      toast.add({ type: 'error', description: result.message })
    }
  }

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-extrabold text-center">Forgot Password</h1>
      <p className="text-sm text-gray-500 text-center mt-2">
        {step === 'email' && 'Enter your email and we will send you a reset code.'}
        {step === 'code' && `Enter the code we sent to ${email}.`}
        {step === 'reset' && 'Choose your new password.'}
      </p>

      {step === 'email' && (
        <form onSubmit={emailForm.handleSubmit(submitEmail)} className="mt-6">
          <TextField control={emailForm.control} name="email" label="Email" placeholder="Enter your email" />
          <Button
            type="submit"
            disabled={emailForm.formState.isSubmitting}
            className="w-full bg-green-600 my-4 hover:bg-green-600"
          >
            {emailForm.formState.isSubmitting ? 'Sending...' : 'Send reset code'}
          </Button>
        </form>
      )}

      {step === 'code' && (
        <form onSubmit={codeForm.handleSubmit(submitCode)} className="mt-6">
          <TextField control={codeForm.control} name="resetCode" label="Reset code" placeholder="Enter the code" />
          <Button
            type="submit"
            disabled={codeForm.formState.isSubmitting}
            className="w-full bg-green-600 my-4 hover:bg-green-600"
          >
            {codeForm.formState.isSubmitting ? 'Verifying...' : 'Verify code'}
          </Button>
          <button
            type="button"
            onClick={() => setStep('email')}
            className="w-full text-sm text-green-600 hover:underline cursor-pointer"
          >
            Use a different email
          </button>
        </form>
      )}

      {step === 'reset' && (
        <form onSubmit={resetForm.handleSubmit(submitNewPassword)} className="mt-6">
          <TextField
            control={resetForm.control}
            name="newPassword"
            label="New password"
            type="password"
            placeholder="Enter your new password"
          />
          <Button
            type="submit"
            disabled={resetForm.formState.isSubmitting}
            className="w-full bg-green-600 my-4 hover:bg-green-600"
          >
            {resetForm.formState.isSubmitting ? 'Saving...' : 'Reset password'}
          </Button>
        </form>
      )}

      <div className="text-center mt-4">
        <Link href="/login" className="text-sm text-green-600 hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  )
}
