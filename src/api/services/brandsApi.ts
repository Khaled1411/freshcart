import { Brand } from "../types/productType"

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1'

export async function getAllBrands(): Promise<Brand[]> {
  const response = await fetch(`${BASE_URL}/brands`)
  if (!response.ok) throw new Error('API Error')
  const payload = await response.json()
  return payload.data
}

export async function getSingleBrand(brandId: string): Promise<Brand> {
  const response = await fetch(`${BASE_URL}/brands/${brandId}`)
  if (!response.ok) throw new Error('API Error')
  const payload = await response.json()
  return payload.data
}
