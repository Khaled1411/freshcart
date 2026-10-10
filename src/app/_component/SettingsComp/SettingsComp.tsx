'use client'
import { changePassword, updateProfile } from '@/api/actions/profile.actions'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import {
  ChangePasswordData,
  changePasswordSchema,
  ProfileData,
  profileSchema,
} from '@/schema/profileSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import TextField from '../TextField/TextField'

export default function SettingsComp({ name, email }: { name: string; email: string }) {
  const router = useRouter()
  const { update } = useSession()

  const profileForm = useForm<ProfileData>({
    defaultValues: { name, email, phone: '' },
    resolver: zodResolver(profileSchema),
  })

  const passwordForm = useForm<ChangePasswordData>({
    defaultValues: { currentPassword: '', password: '', rePassword: '' },
    resolver: zodResolver(changePasswordSchema),
  })

  async function submitProfile(data: ProfileData) {
    const result = await updateProfile(data)

    if (result.success) {
      // refresh the name / email stored in the session
      await update({ name: data.name, email: data.email })
      toast.add({ type: 'success', description: 'Profile updated' })
      router.refresh()
    } else {
      toast.add({ type: 'error', description: result.message })
    }
  }

  async function submitPassword(data: ChangePasswordData) {
    const result = await changePassword(data)

    if (result.success) {
      toast.add({ type: 'success', description: 'Password changed, please login again' })
      // the old token is no longer valid after a password change
      await signOut({ callbackUrl: '/login' })
    } else {
      toast.add({ type: 'error', description: result.message })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* account info */}
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex size-14 items-center justify-center rounded-full bg-green-600 text-2xl font-bold uppercase text-white">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>

      {/* update data */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Update your data</h2>
        <form onSubmit={profileForm.handleSubmit(submitProfile)}>
          <div className="flex flex-col gap-6">
            <TextField control={profileForm.control} name="name" label="Name" placeholder="Enter your name" />
            <TextField control={profileForm.control} name="email" label="Email" placeholder="Enter your email" />
            <TextField control={profileForm.control} name="phone" label="Phone" placeholder="01xxxxxxxxx" />
          </div>
          <Button
            type="submit"
            disabled={profileForm.formState.isSubmitting}
            className="my-4 w-full bg-green-600 hover:bg-green-600"
          >
            {profileForm.formState.isSubmitting ? 'Saving...' : 'Save changes'}
          </Button>
        </form>
      </div>

      {/* change password */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Change password</h2>
        <form onSubmit={passwordForm.handleSubmit(submitPassword)}>
          <div className="flex flex-col gap-6">
            <TextField
              control={passwordForm.control}
              name="currentPassword"
              label="Current password"
              type="password"
              placeholder="Enter your current password"
            />
            <TextField
              control={passwordForm.control}
              name="password"
              label="New password"
              type="password"
              placeholder="Enter your new password"
            />
            <TextField
              control={passwordForm.control}
              name="rePassword"
              label="Confirm new password"
              type="password"
              placeholder="Confirm your new password"
            />
          </div>
          <Button
            type="submit"
            disabled={passwordForm.formState.isSubmitting}
            className="my-4 w-full bg-green-600 hover:bg-green-600"
          >
            {passwordForm.formState.isSubmitting ? 'Saving...' : 'Change password'}
          </Button>
        </form>
      </div>
    </div>
  )
}
