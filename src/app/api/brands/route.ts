// method , response 
//localhost3000/api/brands

import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){

    // logic

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands')
  const payload = await response.json()


  return NextResponse.json(payload)
}


// get req => route handler

// client => get click  

// next auth  

