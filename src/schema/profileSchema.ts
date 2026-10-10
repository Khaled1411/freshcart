import * as zod from 'zod'

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
const passwordMsg = 'Min 8 chars with upper, lower, number and symbol'

export const profileSchema = zod.object({
  name: zod.string().nonempty('Name Req').min(3, 'Min 3 Letters'),
  email: zod.string().nonempty('Email Req').email('Invalid Email'),
  phone: zod.string().nonempty('Phone Req').regex(/^01[0125][0-9]{8}$/, 'Invalid Phone'),
})

export const changePasswordSchema = zod
  .object({
    currentPassword: zod.string().nonempty('Current Password Req'),
    password: zod.string().nonempty('New Password Req').regex(passwordRegex, passwordMsg),
    rePassword: zod.string().nonempty('rePassword Req'),
  })
  .refine((obj) => obj.password === obj.rePassword, {
    path: ['rePassword'],
    message: 'not matched',
  })

export type ProfileData = zod.infer<typeof profileSchema>
export type ChangePasswordData = zod.infer<typeof changePasswordSchema>
