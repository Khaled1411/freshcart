import { getSingleCategory, getSingleSubcategory } from '@/api/services/categoriesApi'
import { getProductsBySubcategory } from '@/api/services/productApi'
import ProductsGrid from '@/app/_component/ProductsGrid/ProductsGrid'
import Link from 'next/link'
import React from 'react'

export default async function SubcategoryDetails(props: {
  params: Promise<{ subId: string }>
}) {
  const { subId } = await props.params

  const subcategory = await getSingleSubcategory(subId)

  const [category, products] = await Promise.all([
    getSingleCategory(subcategory.category),
    getProductsBySubcategory(subId),
  ])

  return (
    <div className="my-10">
      <Link
        href={`/categories/${category._id}`}
        className="text-sm text-green-600 hover:underline"
      >
        ← {category.name}
      </Link>

      <h1 className="text-3xl font-bold mt-2 mb-6">{subcategory.name}</h1>

      <ProductsGrid products={products} />
    </div>
  )
}
