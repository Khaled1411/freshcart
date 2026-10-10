import { Category, Subcategory } from "../types/productType"

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1'

export async function getShopCategory(): Promise<Category[]> {
  try {
    const response = await fetch(`${BASE_URL}/categories`)
    if (!response.ok) throw new Error('API Error')
    const payload = await response.json()
    return payload.data
  } catch (error) {
    throw new Error('API Error')
  }
}

export async function getSingleCategory(categoryId: string): Promise<Category> {
  const response = await fetch(`${BASE_URL}/categories/${categoryId}`)
  if (!response.ok) throw new Error('API Error')
  const payload = await response.json()
  return payload.data
}

// all subcategories that belong to one category
export async function getSubcategoriesByCategory(categoryId: string): Promise<Subcategory[]> {
  const response = await fetch(`${BASE_URL}/categories/${categoryId}/subcategories`)
  if (!response.ok) throw new Error('API Error')
  const payload = await response.json()
  return payload.data
}

export async function getSingleSubcategory(subId: string): Promise<Subcategory> {
  const response = await fetch(`${BASE_URL}/subcategories/${subId}`)
  if (!response.ok) throw new Error('API Error')
  const payload = await response.json()
  return payload.data
}
