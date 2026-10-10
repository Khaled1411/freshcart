export interface OrderItemType {
  _id: string
  count: number
  price: number
  product: {
    _id: string
    title: string
    imageCover: string
  } | null
}

export interface OrderType {
  _id: string
  id: number
  shippingAddress?: {
    details: string
    phone: string
    city: string
  }
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  createdAt: string
  cartItems: OrderItemType[]
}

export interface OrdersResponseType {
  data: OrderType[]
}
