import { getAllProducts } from '@/api/services/productApi'
import React from 'react'
import ProductsGrid from '../_component/ProductsGrid/ProductsGrid'

export default async function Shop(props: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await props.searchParams
  const allProducts = await getAllProducts()

  // search from the navbar: /shop?q=...
  const term = q?.trim().toLowerCase()
  const products = term
    ? allProducts.filter((p) =>
        [p.title, p.category?.name, p.brand?.name].some((v) => v?.toLowerCase().includes(term))
      )
    : allProducts

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold my-2 p-3 text-green-600 border-l-4 border-l-black">
        {term ? `Results for "${q}"` : 'All Products'}
      </h2>
      <p className="text-gray-500 mb-6 px-3">{products.length} products</p>

      <ProductsGrid products={products} />
    </div>
  )
}
