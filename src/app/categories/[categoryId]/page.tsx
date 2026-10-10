import {
  getSingleCategory,
  getSubcategoriesByCategory,
} from '@/api/services/categoriesApi'
import { getProductsByCategory } from '@/api/services/productApi'
import ProductsGrid from '@/app/_component/ProductsGrid/ProductsGrid'
import Link from 'next/link'
import React from 'react'

export default async function CategoryDetails(props: {
  params: Promise<{ categoryId: string }>
}) {
  const { categoryId } = await props.params

  const [category, subcategories, products] = await Promise.all([
    getSingleCategory(categoryId),
    getSubcategoriesByCategory(categoryId),
    getProductsByCategory(categoryId),
  ])

  return (
    <div className="my-10">
      <Link href="/categories" className="text-sm text-green-600 hover:underline">
        ← All categories
      </Link>

      <h1 className="text-3xl font-bold mt-2">{category.name}</h1>

      {/* subcategories */}
      <h2 className="text-xl font-bold my-4 p-2 text-green-600 border-l-4 border-l-black">
        Subcategories
      </h2>
      {subcategories.length === 0 ? (
        <p className="text-gray-500">No subcategories</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {subcategories.map((sub) => (
            <Link
              key={sub._id}
              href={`/subcategories/${sub._id}`}
              className="px-4 py-2 rounded-full border border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}

      {/* products of this category */}
      <h2 className="text-xl font-bold my-6 p-2 text-green-600 border-l-4 border-l-black">
        {category.name} Products
      </h2>
      <ProductsGrid products={products} />
    </div>
  )
}
