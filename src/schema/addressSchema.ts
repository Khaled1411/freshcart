import * as zod from 'zod'

export const addressSchema = zod.object({
  name: zod.string().nonempty('Name Req').min(2, 'Min 2 Letters'),
  city: zod.string().nonempty('City Req').min(2, 'Min 2 Letters'),
  details: zod.string().nonempty('Details Req').min(5, 'Min 5 Letters'),
  phone: zod.string().nonempty('Phone Req').regex(/^01[0125][0-9]{8}$/, 'Invalid Phone'),
})

export type AddressData = zod.infer<typeof addressSchema>
