import { getShopCategory } from '@/api/services/categoriesApi'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function ShopCategory() {
  // call api
  const data = await getShopCategory()

  return (
    <section className="my-10">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
          <span className="h-7 w-1 rounded bg-green-600" />
          <span>
            Shop By <span className="text-green-600">Category</span>
          </span>
        </h2>
        <Link
          href="/categories"
          className="flex items-center gap-1.5 text-sm font-medium text-green-600 hover:underline"
        >
          View All Categories <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {data.map((category) => (
          <Link
            href={`/categories/${category._id}`}
            key={category._id}
            className="flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <Image
              className="size-16 rounded-full object-cover"
              src={category.image}
              alt={category.name}
              width={100}
              height={100}
            />
            <h4 className="text-center text-sm font-medium text-gray-700">{category.name}</h4>
          </Link>
        ))}
      </div>
    </section>
  )
}
