'use client'
import { addToWishlist } from '@/api/actions/wishlistActions/addToWishlist'
import { removeFromWishlist } from '@/api/actions/wishlistActions/removeFromWishlist'
import { WishlistResponseType } from '@/api/types/wishlistType'
import { toast } from '@/components/ui/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function WishlistBtn({ prodId }: { prodId: string }) {
  const queryClient = useQueryClient()
  const { status } = useSession()

  // same key everywhere => one request shared by all cards
  const { data } = useQuery<WishlistResponseType>({
    queryKey: ['getWishlist'],
    queryFn: async () => {
      const response = await fetch('/api/wishlist')
      if (!response.ok) throw new Error('Failed To Fetch')
      return response.json()
    },
    enabled: status === 'authenticated',
    retry: false,
  })

  const isInWishlist = !!data?.data?.some((p) => p._id === prodId)

  const { mutate: add, isPending: isAdding } = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      toast.add({ type: 'success', description: 'Added to wishlist' })
      queryClient.invalidateQueries({ queryKey: ['getWishlist'] })
    },
    onError: () => {
      toast.add({ type: 'error', description: 'Failed to add to wishlist' })
    },
  })

  const { mutate: remove, isPending: isRemoving } = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      toast.add({ type: 'success', description: 'Removed from wishlist' })
      queryClient.invalidateQueries({ queryKey: ['getWishlist'] })
    },
    onError: () => {
      toast.add({ type: 'error', description: 'Failed to remove from wishlist' })
    },
  })

  function handleClick() {
    if (status !== 'authenticated') {
      toast.add({ type: 'error', description: 'Login first' })
      return
    }
    if (isInWishlist) {
      remove(prodId)
    } else {
      add(prodId)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isAdding || isRemoving}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center disabled:opacity-60 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-4 w-4 ${isInWishlist ? 'text-red-500' : 'text-gray-600'}`}
        fill={isInWishlist ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        />
      </svg>
    </button>
  )
}
