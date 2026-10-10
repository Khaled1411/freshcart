import { getAllBrands } from '@/api/services/brandsApi'
import { Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import PageHeader from '../_component/PageHeader/PageHeader'

export default async function Brands() {
  const brands = await getAllBrands()

  return (
    <>
      <PageHeader
        title="Top Brands"
        subtitle="Shop from your favorite brands"
        icon={<Tag className="size-7" />}
        gradient="from-violet-600 via-purple-600 to-fuchsia-500"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Brands' }]}
      />

      <div className="grid grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {brands.map((brand) => (
          <Link
            href={`/brands/${brand._id}`}
            key={brand._id}
            className="rounded-xl border border-gray-100 bg-white p-3 text-center shadow-sm transition hover:shadow-md"
          >
            <div className="flex h-24 items-center justify-center rounded-lg bg-gray-50 p-3">
              <Image
                src={brand.image}
                alt={brand.name}
                width={160}
                height={90}
                className="h-full w-full object-contain"
              />
            </div>
            <h3 className="mt-3 text-xs font-medium text-gray-700">{brand.name}</h3>
          </Link>
        ))}
      </div>
    </>
  )
}
