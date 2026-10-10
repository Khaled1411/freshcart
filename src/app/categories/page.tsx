import { getShopCategory } from '@/api/services/categoriesApi'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Categories() {
  const categories = await getShopCategory()

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold my-2 p-3 text-green-600 border-l-4 border-l-black">
        All Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {categories.map((category) => (
          <Link
            href={`/categories/${category._id}`}
            key={category._id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={300}
              height={300}
              className="w-full h-60 object-cover"
            />
            <h3 className="p-3 text-center font-semibold text-gray-800">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
