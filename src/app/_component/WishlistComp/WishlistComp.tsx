'use client'
import { removeFromWishlist } from '@/api/actions/wishlistActions/removeFromWishlist'
import { WishlistResponseType } from '@/api/types/wishlistType'
import { toast } from '@/components/ui/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AddBtn from '../AddBtn/AddBtn'

export default function WishlistComp() {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery<WishlistResponseType>({
    queryKey: ['getWishlist'],
    queryFn: async () => {
      const response = await fetch('/api/wishlist')
      if (!response.ok) throw new Error('Failed To Fetch')
      return response.json()
    },
    retry: false,
  })

  const { mutate: removeItem, isPending, variables } = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      toast.add({ type: 'success', description: 'Removed from wishlist' })
      queryClient.invalidateQueries({ queryKey: ['getWishlist'] })
    },
    onError: () => {
      toast.add({ type: 'error', description: 'Failed' })
    },
  })

  if (isLoading) {
    return <h2 className="py-10 text-center">Loading......</h2>
  }

  if (isError) {
    return <h2 className="py-10 text-center text-red-600">Failed to load your wishlist</h2>
  }

  const products = data?.data ?? []

  if (products.length === 0) {
    return (
      <section className="py-16 text-center">
        <h2 className="text-2xl font-semibold text-[#191919]">Your wishlist is empty</h2>
        <p className="mt-2 text-gray-500">Tap the heart on any product to save it here.</p>
        <Link
          href="/"
          className="inline-block mt-6 px-8 py-3 bg-green-600 text-white rounded-full font-semibold"
        >
          Continue shopping
        </Link>
      </section>
    )
  }

  return (
    <section className="py-9 px-4 md:px-8">
      <h1 className="text-center text-[#191919] text-[32px] font-semibold leading-[38px]">
        My Wishlist
      </h1>
      <p className="text-center text-gray-500 mt-1">{products.length} item(s)</p>

      <div className="mt-8 flex flex-col gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl"
          >
            <Link href={`/productDetails/${product._id}`} className="shrink-0">
              <Image
                width={100}
                height={100}
                src={product.imageCover}
                alt={product.title}
                className="w-[100px] h-[100px] object-contain"
              />
            </Link>

            <div className="flex-1 text-center sm:text-left">
              <Link href={`/productDetails/${product._id}`}>
                <h3 className="text-gray-800 font-medium line-clamp-1">{product.title}</h3>
              </Link>
              <p className="uppercase text-green-600 text-xs font-medium">
                {product.category?.name}
              </p>
              <div className="mt-1 flex items-baseline justify-center sm:justify-start gap-2">
                {product.priceAfterDiscount ? (
                  <>
                    <span className="text-blue-600 text-lg font-semibold">
                      {product.priceAfterDiscount} EGP
                    </span>
                    <span className="text-gray-400 text-sm line-through">{product.price} EGP</span>
                  </>
                ) : (
                  <span className="text-gray-700 font-semibold">{product.price} EGP</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <AddBtn
                prodId={product._id}
                cls="px-5 py-2 rounded-full bg-green-600 text-white text-sm font-semibold cursor-pointer"
                child={<span>Add to cart</span>}
              />
              <button
                onClick={() => removeItem(product._id)}
                disabled={isPending && variables === product._id}
                className="px-5 py-2 rounded-full bg-[#f2f2f2] text-[#4c4c4c] text-sm font-semibold cursor-pointer disabled:opacity-60"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
