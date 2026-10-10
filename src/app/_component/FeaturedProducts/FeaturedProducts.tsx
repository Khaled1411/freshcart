import { getAllProducts } from '@/api/services/productApi'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ProductsGrid from '../ProductsGrid/ProductsGrid'

export default async function FeaturedProducts() {
  // call api
  const data = await getAllProducts()

  return (
    <section className="my-10">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
          <span className="h-7 w-1 rounded bg-green-600" />
          <span>
            Featured <span className="text-green-600">Products</span>
          </span>
        </h2>
        <Link href="/shop" className="flex items-center gap-1.5 text-sm font-medium text-green-600 hover:underline">
          View All Products <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-6">
        <ProductsGrid products={data} />
      </div>
    </section>
  )
}
