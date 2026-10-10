import * as zod from 'zod'

export const forgotEmailSchema = zod.object({
  email: zod.string().nonempty('Email Req').email('Invalid Email'),
})

export const resetCodeSchema = zod.object({
  resetCode: zod.string().nonempty('Code Req').regex(/^[0-9]+$/, 'Numbers only'),
})

export const newPasswordSchema = zod.object({
  newPassword: zod
    .string()
    .nonempty('Password Req')
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Min 8 chars with upper, lower, number and symbol'
    ),
})

export type ForgotEmailData = zod.infer<typeof forgotEmailSchema>
export type ResetCodeData = zod.infer<typeof resetCodeSchema>
export type NewPasswordData = zod.infer<typeof newPasswordSchema>
