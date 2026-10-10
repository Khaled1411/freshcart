import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function getTokenFun(){
   const cookie = await cookies()

   // on https (Vercel) next-auth prefixes the cookie name with __Secure-
   const nextAuthToken =
     cookie.get('__Secure-next-auth.session-token')?.value ??
     cookie.get('next-auth.session-token')?.value

   const accessToken = await decode({
    secret : process.env.NEXTAUTH_SECRET! ,
    token: nextAuthToken
   })
   return accessToken?.token
}
