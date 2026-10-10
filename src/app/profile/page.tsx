import { authOptions } from '@/next-auth/authOption'
import { getServerSession } from 'next-auth'
import React from 'react'
import ProfileComp from '../_component/ProfileComp/ProfileComp'

export default async function Profile() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <ProfileComp name={session?.user?.name ?? ''} email={session?.user?.email ?? ''} />
    </>
  )
}
