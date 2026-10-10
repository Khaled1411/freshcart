import { ProductType } from "../types/productType"

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1'

export async function getAllProducts(): Promise<ProductType[]> {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      cache: 'force-cache',
    })
    if (!response.ok) throw new Error('API Error')
    const payload = await response.json()

    return payload.data
  } catch (error) {
    throw new Error('API Error')
  }
}

// https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b
export async function getSingleProduct(prodId: string): Promise<ProductType> {
  try {
    const response = await fetch(`${BASE_URL}/products/${prodId}`)
    if (!response.ok) throw new Error('API Error')
    const payload = await response.json()

    return payload.data
  } catch (error) {
    throw new Error('API Error')
  }
}

// all products of one category
export async function getProductsByCategory(categoryId: string): Promise<ProductType[]> {
  const response = await fetch(`${BASE_URL}/products?category[in]=${categoryId}`)
  if (!response.ok) throw new Error('API Error')
  const payload = await response.json()
  return payload.data
}

// all products of one subcategory
export async function getProductsBySubcategory(subId: string): Promise<ProductType[]> {
  const response = await fetch(`${BASE_URL}/products?subcategory[in]=${subId}`)
  if (!response.ok) throw new Error('API Error')
  const payload = await response.json()
  return payload.data
}

// all products of one brand
export async function getProductsByBrand(brandId: string): Promise<ProductType[]> {
  const response = await fetch(`${BASE_URL}/products?brand=${brandId}`)
  if (!response.ok) throw new Error('API Error')
  const payload = await response.json()
  return payload.data
}
