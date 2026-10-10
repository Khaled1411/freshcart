import { getSingleBrand } from '@/api/services/brandsApi'
import { getProductsByBrand } from '@/api/services/productApi'
import ProductsGrid from '@/app/_component/ProductsGrid/ProductsGrid'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function BrandDetails(props: {
  params: Promise<{ brandId: string }>
}) {
  const { brandId } = await props.params

  const [brand, products] = await Promise.all([
    getSingleBrand(brandId),
    getProductsByBrand(brandId),
  ])

  return (
    <div className="my-10">
      <Link href="/brands" className="text-sm text-green-600 hover:underline">
        ← All brands
      </Link>

      <div className="flex items-center gap-4 mt-2 mb-6">
        <Image
          src={brand.image}
          alt={brand.name}
          width={120}
          height={80}
          className="h-16 w-auto object-contain"
        />
        <h1 className="text-3xl font-bold">{brand.name}</h1>
      </div>

      <ProductsGrid products={products} />
    </div>
  )
}
