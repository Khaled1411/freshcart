'use client'
import { toast } from '@/components/ui/toast'
import { ArrowRight } from 'lucide-react'
import React, { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.add({ type: 'error', description: 'Please enter a valid email' })
      return
    }
    toast.add({ type: 'success', description: 'Thanks for subscribing!' })
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-600"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 px-6 py-3 text-sm font-semibold text-white cursor-pointer"
      >
        Subscribe <ArrowRight className="size-4" />
      </button>
    </form>
  )
}
