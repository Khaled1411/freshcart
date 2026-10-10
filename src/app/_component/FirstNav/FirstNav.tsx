'use client'
import { Gift, Mail, Phone, Truck, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function FirstNav() {
  const { data: session, status } = useSession()

  return (
    <div className="hidden lg:block border-b border-gray-200 bg-white text-xs text-gray-600">
      <div className="container mx-auto xl:max-w-7xl px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <Truck className="size-3.5 text-green-600" /> Free Shipping on Orders 500 EGP
          </span>
          <span className="flex items-center gap-2">
            <Gift className="size-3.5 text-green-600" /> New Arrivals Daily
          </span>
        </div>

        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2">
            <Phone className="size-3.5" /> +1 (800) 123-4567
          </span>
          <span className="flex items-center gap-2">
            <Mail className="size-3.5" /> support@freshcart.com
          </span>

          {status === 'authenticated' ? (
            <>
              <Link href="/profile" className="flex items-center gap-1.5 hover:text-green-600">
                <User className="size-3.5" /> {session?.user?.name}
              </Link>
              <button
                onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
                className="hover:text-green-600 cursor-pointer"
              >
                Sign Out
              </button>
            </>
          ) : status === 'unauthenticated' ? (
            <>
              <Link href="/login" className="flex items-center gap-1.5 hover:text-green-600">
                <User className="size-3.5" /> Sign In
              </Link>
              <Link href="/register" className="hover:text-green-600">
                Sign Up
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
