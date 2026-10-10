'use client'
import { OrderType, OrdersResponseType } from '@/api/types/orderType'
import { useQuery } from '@tanstack/react-query'
import {
  Banknote,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  Clock,
  CreditCard,
  MapPin,
  Phone,
  ShoppingBag,
  Truck,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const money = (n: number) => n.toLocaleString('en-US')

// the API only tells us isPaid / isDelivered, so the status is derived from them
function getStatus(order: OrderType) {
  if (order.isDelivered) {
    return { label: 'Delivered', cls: 'bg-green-100 text-green-700', Icon: CircleCheck }
  }
  if (order.isPaid) {
    return { label: 'On the way', cls: 'bg-sky-100 text-sky-700', Icon: Truck }
  }
  return { label: 'Processing', cls: 'bg-amber-100 text-amber-700', Icon: Clock }
}

function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-xs text-gray-500">
      <Link href="/" className="hover:text-green-600">
        Home
      </Link>
      <span>/</span>
      <span className="text-gray-800">My Orders</span>
    </nav>
  )
}

export default function OrdersComp() {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({})

  const { data, isLoading, isError } = useQuery<OrdersResponseType>({
    queryKey: ['getOrders'],
    queryFn: async () => {
      const response = await fetch('/api/orders')
      if (!response.ok) throw new Error('Failed To Fetch')
      return response.json()
    },
    retry: false,
  })

  if (isLoading) {
    return <h2 className="py-10 text-center">Loading......</h2>
  }

  if (isError) {
    return <h2 className="py-10 text-center text-red-600">Failed to load your orders</h2>
  }

  // newest first
  const orders = [...(data?.data ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <section className="px-4 py-8">
      <Breadcrumb />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-green-600 text-white shadow">
            <ShoppingBag className="size-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            <p className="text-sm text-gray-500">
              Track and manage your {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </p>
          </div>
        </div>
        <Link
          href="/shop"
          className="flex items-center gap-2 text-sm font-medium text-green-600 hover:underline"
        >
          <ShoppingBag className="size-4" /> Continue Shopping
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white py-16 text-center">
          <h2 className="text-xl font-semibold text-gray-900">You have no orders yet</h2>
          <Link
            href="/shop"
            className="mt-5 inline-block rounded-full bg-green-600 px-8 py-3 font-semibold text-white"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {orders.map((order, index) => {
            const open = openMap[order._id] ?? index === 0
            const status = getStatus(order)
            const itemsCount = order.cartItems.reduce((sum, item) => sum + item.count, 0)
            const subtotal = order.cartItems.reduce((sum, item) => sum + item.price * item.count, 0)
            const firstProduct = order.cartItems[0]?.product
            const extra = order.cartItems.length - 1
            const isCard = order.paymentMethodType === 'card'

            return (
              <div
                key={order._id}
                className={`rounded-2xl border bg-white shadow-sm ${
                  open ? 'border-green-200 ring-1 ring-green-100' : 'border-gray-200'
                }`}
              >
                {/* summary row */}
                <div className="flex flex-wrap items-center gap-4 p-4">
                  <div className="relative size-20 shrink-0 rounded-xl border border-gray-100 bg-white p-2">
                    {firstProduct?.imageCover && (
                      <Image
                        src={firstProduct.imageCover}
                        alt={firstProduct.title}
                        width={80}
                        height={80}
                        className="size-full object-contain"
                      />
                    )}
                    {extra > 0 && (
                      <span className="absolute -left-2 -top-2 flex size-6 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white">
                        +{extra}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.cls}`}
                    >
                      <status.Icon className="size-3" /> {status.label}
                    </span>
                    <p className="mt-1 text-lg font-bold text-gray-900"># {order.id}</p>
                    <p className="flex flex-wrap items-center gap-x-2 text-xs text-gray-500">
                      <span>
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span>•</span>
                      <span>
                        {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
                      </span>
                      {order.shippingAddress?.city && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3" /> {order.shippingAddress.city}
                          </span>
                        </>
                      )}
                    </p>
                    <p className="mt-2 text-xl font-bold text-gray-900">
                      {money(order.totalOrderPrice)}{' '}
                      <span className="text-xs font-normal text-gray-400">EGP</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-center">
                    <span
                      title={isCard ? 'Paid online' : 'Cash on delivery'}
                      className={`flex size-9 items-center justify-center rounded-lg ${
                        isCard ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {isCard ? <CreditCard className="size-4" /> : <Banknote className="size-4" />}
                    </span>
                    <button
                      onClick={() => setOpenMap((prev) => ({ ...prev, [order._id]: !open }))}
                      className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer ${
                        open
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {open ? 'Hide' : 'Details'}
                      {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                    </button>
                  </div>
                </div>

                {/* details */}
                {open && (
                  <div className="rounded-b-2xl border-t border-gray-100 bg-green-50/40 p-4">
                    <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <ShoppingBag className="size-4 text-green-600" /> Order Items
                    </p>

                    <div className="flex flex-col gap-2">
                      {order.cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-3"
                        >
                          <div className="size-14 shrink-0 rounded-lg border border-gray-100 p-1">
                            {item.product?.imageCover && (
                              <Image
                                src={item.product.imageCover}
                                alt={item.product.title}
                                width={56}
                                height={56}
                                className="size-full object-contain"
                              />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-1 text-sm font-medium text-gray-800">
                              {item.product?.title ?? 'Product no longer available'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.count} × {money(item.price)} EGP
                            </p>
                          </div>
                          <p className="text-right font-bold text-gray-900">
                            {money(item.price * item.count)}
                            <span className="block text-[10px] font-normal text-gray-400">EGP</span>
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl border border-gray-100 bg-white p-4">
                        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <MapPin className="size-4 text-blue-600" /> Delivery Address
                        </p>
                        {order.shippingAddress ? (
                          <>
                            <p className="font-semibold text-gray-900">{order.shippingAddress.city}</p>
                            <p className="mt-1 text-xs text-gray-500">{order.shippingAddress.details}</p>
                            <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                              <Phone className="size-3" /> {order.shippingAddress.phone}
                            </p>
                          </>
                        ) : (
                          <p className="text-xs text-gray-500">No address</p>
                        )}
                      </div>

                      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <span className="flex size-5 items-center justify-center rounded bg-amber-500 text-white">
                            <ShoppingBag className="size-3" />
                          </span>
                          Order Summary
                        </p>
                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{money(subtotal)} EGP</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>{order.shippingPrice ? `${money(order.shippingPrice)} EGP` : 'Free'}</span>
                          </div>
                          <div className="flex justify-between border-t border-amber-200 pt-2 text-sm font-bold text-gray-900">
                            <span>Total</span>
                            <span>{money(order.totalOrderPrice)} EGP</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
