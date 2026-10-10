import { ProductType } from './productType'

// GET /wishlist  -> full product objects
export interface WishlistResponseType {
  status: string
  count: number
  data: ProductType[]
}

// POST / DELETE /wishlist -> list of product ids
export interface WishlistMutationResponseType {
  status: string
  message: string
  data: string[]
}
