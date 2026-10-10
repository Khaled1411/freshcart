'use client'
import { clearCart } from '@/api/actions/cartActions/clearCart.action'
import { getCart } from '@/api/actions/cartActions/getCart'
import { deleteCartItem } from '@/api/actions/deleteCartItem'
import { updateCart } from '@/api/actions/updateCartItem'
import { CartResponseType } from '@/api/types/cartType'
import { toast } from '@/components/ui/toast'
import { useMutation, useQuery , useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

export default   function CartComp() {
 const query= useQueryClient()

const {data:cartData , isLoading}= useQuery<CartResponseType>({
    queryKey:['getCart'] ,
    queryFn: async()=>{
        const response = await fetch('/api/cart')
        if(!response.ok) throw new Error('faild To Fetch')
          return   response.json()
    }

})
console.log('cart Data..' , cartData);


// delete 
const {data:delData , mutate:delCartItem}= useMutation({
  mutationFn: deleteCartItem ,
  onSuccess:()=>{
      toast.add({
            type: "success",
            description: 'Product Deleted Successfully',
          }) 
query.invalidateQueries({queryKey:['getCart']})

  } ,
  onError:()=>{

      toast.add({
                type: "error",
                description: 'Failed',
              }) 
    

  }
})


// update 
const {data:updatedData , mutate:updateCartItem}= useMutation({
  mutationFn:  updateCart ,
  onSuccess:()=>{
      toast.add({
            type: "success",
            description: 'Product updated Successfully',
          }) 
query.invalidateQueries({queryKey:['getCart']})

  } ,
  onError:()=>{

      toast.add({
                type: "error",
                description: 'Failed',
              }) 
    

  }
})

// clear Cart

const {data:clearData , mutate:clearCartItems}= useMutation({
  mutationFn:  clearCart ,
  onSuccess:()=>{
      toast.add({
            type: "success",
            description: 'Cart Deleted Successfully',
          }) 
          query.invalidateQueries({queryKey:['getCart']})

  } ,
  onError:()=>{

      toast.add({
                type: "error",
                description: 'Failed',
              }) 
    

  }
})

function handleClearCart(){
  clearCartItems()
}
function HandleUpdateCart(prodId:string , count : number){
  updateCartItem({prodId , count})
}


if(isLoading){
    return <h2>Loading......</h2>


}
  return (
   <>
   {cartData?.numOfCartItems ? <section className="w-full bg-white dark:bg-[#0A2025] py-9 px-8">
  <h1 className="text-center text-[#191919] dark:text-white text-[32px] font-semibold leading-[38px]">
    My Shopping Cart
  </h1>
  <div className="flex items-start mt-8 gap-6">
    <div className="bg-white p-4 w-[800px] rounded-xl">
      <table className="w-full bg-white rounded-xl">
        <thead>
          <tr className="text-center border-b border-gray-400 w-full text-[#7f7f7f] text-sm font-medium uppercase leading-[14px] tracking-wide">
            <th className="text-left px-2 py-2">Product</th>
            <th className="px-2 py-2">price</th>
            <th className="px-2 py-2">Quantity</th>
            <th className="px-2 py-2">Subtotal</th>
            <th className="w-7 px-2 py-2" />
          </tr>
        </thead>
        <tbody>
        {cartData?.data.products.map((product)=>   <tr key={product._id} className="text-center">
            <td className="px-2 py-2 text-left align-top">
              <img src={product.product.imageCover} alt="test" className="w-[100px] mr-2 inline-block h-[100px]" /><span>Green Capsicum</span>
            </td>
            <td className="px-2 py-2">{product.price} EGP </td>
            <td className="p-2 mt-9 bg-white rounded-[170px] border border-[#a0a0a0] justify-around items-center flex">
              <svg width={14} height={15} className="cursor-pointer" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path onClick={()=>{HandleUpdateCart(product.product._id , product.count - 1)}} d="M2.33398 7.5H11.6673" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg><span className="w-10 text-center text-[#191919] text-base font-normal leading-normal">{product.count}</span><svg className="cursor-pointer relative" width={14} height={15} viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path onClick={()=>{HandleUpdateCart(product.product._id , product.count + 1)}} d="M2.33398 7.49998H11.6673M7.00065 2.83331V12.1666V2.83331Z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </td>
            <td className="px-2 py-2">{product.count * product.price}EGP</td>
            <td className="px-2 py-2">
              <svg onClick={()=>{delCartItem(product.product._id)}} width={24} className="cursor-pointer" height={25} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z" stroke="#CCCCCC" strokeMiterlimit={10} />
                <path d="M16 8.5L8 16.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 16.5L8 8.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </td>
          </tr>)}
         
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-400">
            <td className="px-2 py-2" colSpan={3}>
              <button className="px-8 cursor-pointer py-3.5 bg-[#f2f2f2] rounded-[43px] text-[#4c4c4c] text-sm font-semibold className leading-[16px]">
                Return to shop
              </button>
            </td>
            <td className="px-2 py-2" colSpan={2}>
              <button onClick={handleClearCart} className="px-8 py-3.5 cursor-pointer bg-[#f2f2f2] rounded-[43px] text-[#4c4c4c] text-sm font-semibold className leading-[16px]">
                Clear Cart
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div className="w-[424px] bg-white rounded-lg p-6">
      <h2 className="text-[#191919] mb-2 text-xl font-medium leading-[30px]">
        Cart Total
      </h2>
      <div className="w-[376px] py-3 justify-between items-center flex">
        <span className="text-[#4c4c4c] text-base font-normal leading-normal">Total:</span><span className="text-[#191919] text-base font-semibold leading-tight">{cartData?.data.totalCartPrice} EGP</span>
      </div>
      <div className="w-[376px] py-3 shadow-[0px_1px_0px_0px_rgba(229,229,229,1.00)] justify-between items-center flex">
        <span className="text-[#4c4c4c] text-sm font-normal leading-[21px]">Shipping:</span><span className="text-[#191919] text-sm font-medium leading-[21px]">Free</span>
      </div>
      <div className="w-[376px] py-3 shadow-[0px_1px_0px_0px_rgba(229,229,229,1.00)] justify-between items-center flex">
        <span className="text-[#4c4c4c] text-sm font-normal leading-[21px]"> NumOfCartItems: </span><span className="text-[#191919] text-sm font-medium leading-[21px]"> {cartData?.numOfCartItems} </span>
      </div>
      <button className="w-[376px] text-white mt-5 px-10 py-4 bg-[#00b206] rounded-[44px] gap-4 text-base font-semibold leading-tight">
       <Link href={`/checkout/${cartData?.cartId}`}>  Proceed to checkout </Link>
      </button>
    </div>
  </div>
  <div className="mt-6 p-5 w-[800px] bg-white rounded-lg border border-[#e6e6e6] justify-start items-center gap-6 inline-flex">
    <h3 className="text-[#191919] w-1/4 text-xl font-medium className leading-[30px]">
      Coupon Code
    </h3>
    <div className="w-full border border-[#e6e6e6]">
      <input placeholder="Enter code" type="text" className="w-2/3 px-6 py-3.5 outline-none bg-white rounded-[46px] text-[#999999] text-base font-normal leading-normal" /><button className="px-10 py-4 bg-[#333333] rounded-[43px] text-white text-base font-semibold leading-tight">
        Apply Coupon
      </button>
    </div>
  </div>
</section>
 :<h2> Cart Empty</h2>}
  


   </>
  )
}
