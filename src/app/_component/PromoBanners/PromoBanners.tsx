import { ArrowRight, Flame, Sparkles } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function PromoBanners() {
  return (
    <div className="my-10 grid gap-6 md:grid-cols-2">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 p-8 text-white">
        <div className="absolute -right-10 -top-10 size-44 rounded-full bg-white/10" />
        <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
          <Flame className="size-3.5" /> Deal of the Day
        </span>
        <h3 className="relative mt-4 text-2xl font-bold">Fresh Organic Fruits</h3>
        <p className="relative mt-1 text-sm text-white/90">Get up to 40% off on selected organic fruits</p>
        <p className="relative mt-4 flex items-baseline gap-3">
          <span className="text-3xl font-extrabold">40% OFF</span>
          <span className="text-xs text-white/80">Use code: ORGANIC40</span>
        </p>
        <Link
          href="/shop"
          className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-50"
        >
          Shop Now <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 p-8 text-white">
        <div className="absolute -right-10 -top-10 size-44 rounded-full bg-white/10" />
        <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
          <Sparkles className="size-3.5" /> New Arrivals
        </span>
        <h3 className="relative mt-4 text-2xl font-bold">Exotic Vegetables</h3>
        <p className="relative mt-1 text-sm text-white/90">Discover our latest collection of premium vegetables</p>
        <p className="relative mt-4 flex items-baseline gap-3">
          <span className="text-3xl font-extrabold">25% OFF</span>
          <span className="text-xs text-white/80">Use code: FRESH25</span>
        </p>
        <Link
          href="/shop"
          className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50"
        >
          Explore Now <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  )
}
