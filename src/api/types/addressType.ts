export interface AddressType {
  _id: string
  name: string
  details: string
  phone: string
  city: string
}

export interface AddressesResponseType {
  data: AddressType[]
}
