import { ProductType } from '@/api/types/productType'
import React from 'react'
import ProductCard from '../ProductCard/ProductCard'

export default function ProductsGrid({ products }: { products: ProductType[] }) {
  if (!products || products.length === 0) {
    return <p className="py-10 text-center text-gray-500">No products found</p>
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  )
}
