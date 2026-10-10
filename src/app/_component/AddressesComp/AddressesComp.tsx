'use client'
import { addAddress } from '@/api/actions/addressActions/addAddress'
import { removeAddress } from '@/api/actions/addressActions/removeAddress'
import { AddressesResponseType } from '@/api/types/addressType'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import { AddressData, addressSchema } from '@/schema/addressSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Building2, MapPin, Phone, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from '../TextField/TextField'

export default function AddressesComp() {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)

  const { data, isLoading, isError } = useQuery<AddressesResponseType>({
    queryKey: ['getAddresses'],
    queryFn: async () => {
      const response = await fetch('/api/addresses')
      if (!response.ok) throw new Error('Failed To Fetch')
      return response.json()
    },
    retry: false,
  })

  const form = useForm<AddressData>({
    defaultValues: { name: '', city: '', details: '', phone: '' },
    resolver: zodResolver(addressSchema),
  })

  async function submitAddress(values: AddressData) {
    const result = await addAddress(values)

    if (result.success) {
      toast.add({ type: 'success', description: 'Address added' })
      form.reset()
      setShowForm(false)
      queryClient.invalidateQueries({ queryKey: ['getAddresses'] })
    } else {
      toast.add({ type: 'error', description: result.message })
    }
  }

  async function handleRemove(addressId: string) {
    if (!window.confirm('Delete this address?')) return

    setRemovingId(addressId)
    const result = await removeAddress(addressId)
    setRemovingId(null)

    if (result.success) {
      toast.add({ type: 'success', description: 'Address removed' })
      queryClient.invalidateQueries({ queryKey: ['getAddresses'] })
    } else {
      toast.add({ type: 'error', description: result.message })
    }
  }

  const addresses = data?.data ?? []

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
          <p className="text-sm text-gray-500">Manage your saved delivery addresses</p>
        </div>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 cursor-pointer"
        >
          <Plus className="size-4" /> {showForm ? 'Cancel' : 'Add Address'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={form.handleSubmit(submitAddress)}
          className="mt-5 rounded-xl border border-green-100 bg-green-50/40 p-4"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField control={form.control} name="name" label="Address name" placeholder="Home, Work..." />
            <TextField control={form.control} name="city" label="City" placeholder="Enter your city" />
            <TextField control={form.control} name="details" label="Details" placeholder="Street, building, floor..." />
            <TextField control={form.control} name="phone" label="Phone" placeholder="01xxxxxxxxx" />
          </div>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="mt-5 w-full bg-green-600 hover:bg-green-600"
          >
            {form.formState.isSubmitting ? 'Saving...' : 'Save address'}
          </Button>
        </form>
      )}

      <div className="mt-5">
        {isLoading ? (
          <p className="py-6 text-center text-gray-500">Loading......</p>
        ) : isError ? (
          <p className="py-6 text-center text-red-600">Failed to load your addresses</p>
        ) : addresses.length === 0 ? (
          <p className="py-6 text-center text-gray-500">You have no saved addresses yet</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {addresses.map((address) => (
              <div
                key={address._id}
                className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <MapPin className="size-5" />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900">{address.name}</p>
                  <p className="mt-1 text-xs text-gray-500">{address.details}</p>
                  <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <Phone className="size-3" /> {address.phone}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                    <Building2 className="size-3" /> {address.city}
                  </p>
                </div>

                <button
                  onClick={() => handleRemove(address._id)}
                  disabled={removingId === address._id}
                  aria-label="Delete address"
                  className="flex size-8 items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 disabled:opacity-60 cursor-pointer"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
