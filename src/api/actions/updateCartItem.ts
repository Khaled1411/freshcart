'use server'

import { getTokenFun } from "@/utilities/getTokenData"
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function updateCart({prodId , count}:{prodId:string , count:number}){

    // get token , prodId
 const token = await   getTokenFun()
 if(!token){
    throw new Error('Unauthorized')
 }

try {
     const response= await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${prodId}` , {
    method:'PUT' , 
    body : JSON.stringify({
        count:count
    }) ,
    headers :{
        token : token ,
        'Content-type':'application/json'
    }
 })


 if(!response.ok) throw new Error('Unauthorized')

    const payload = await response.json()

    console.log(payload);

    return payload
    
    
} catch (error) {

    throw new Error('Unauthorized')
    
}


}