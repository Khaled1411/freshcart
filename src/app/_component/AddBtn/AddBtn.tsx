'use client'
import { addToCart } from '@/api/actions/cartActions/addToCart'
import React, { ReactNode } from 'react'
import { toast } from "@/components/ui/toast"
import { useMutation  , useQueryClient} from '@tanstack/react-query'

// call api add prod to cart => get token
export default  function AddBtn({cls , child , prodId}:{cls:string , child:ReactNode , prodId:string}) {
let query = useQueryClient()
 async function handleAddToCart(){

  mutate(prodId)
// try{
//       const data = await addToCart(prodId)
//   if( data.message === "Product added successfully to your cart"){
//  toast.add({
//             type: "success",
//             description: data.message,
//           }) 
//   }else{

//      toast.add({
//             type: "error",
//             description: 'Login first',
//           }) 

//   }

// }catch(error){
//        toast.add({
//             type: "error",
//             description: 'Login first',
//           }) 

// }
 
}

const {data , mutate}= useMutation({
  mutationFn : addToCart , 
  onSuccess:()=>{
     toast.add({
            type: "success",
            description: 'Product Added Successfully',
          }) 

          query.invalidateQueries({queryKey:['getCart']})


  } ,
  onError:()=>{
          toast.add({
            type: "error",
            description: 'Login first',
          })  
  }
})

console.log(data);


  return (
    <>
      <button onClick={handleAddToCart} className={cls}>
        {child}
        </button>

        
    
    </>
  )
}
