"use client"

import * as React from "react"
import Link from "next/link"
import { Headset, Heart, Search, ShoppingCart, User } from "lucide-react"
import logo from '../../../assets/freshcart-logo.svg'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@base-ui/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

import { getCart } from '@/api/actions/cartActions/getCart'
import { CartResponseType } from '@/api/types/cartType'
import { Category } from '@/api/types/productType'
import { WishlistResponseType } from '@/api/types/wishlistType'
import { useQuery } from '@tanstack/react-query'
 
export default function Navbar() {
  const {data:cartData , isLoading}= useQuery<CartResponseType>({
    queryKey:['getCart'] ,
    queryFn: async()=>{
        const response = await fetch('/api/cart')
        if(!response.ok) throw new Error('faild To Fetch')
          return   response.json()
    }

})

  const {data:categoriesData}= useQuery<{data:Category[]}>({
    queryKey:['getCategories'] ,
    queryFn: async()=>{
        const response = await fetch('/api/categories')
        if(!response.ok) throw new Error('faild To Fetch')
          return   response.json()
    }
  })

  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState('')

  function handleSearch(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const q = searchTerm.trim()
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
  }

  function handleLogout(){
    signOut({redirect:true , callbackUrl:'/login'})
  }
 const {data:sessionData , status}= useSession()

 const {data:wishlistData}= useQuery<WishlistResponseType>({
    queryKey:['getWishlist'] ,
    queryFn: async()=>{
        const response = await fetch('/api/wishlist')
        if(!response.ok) throw new Error('faild To Fetch')
          return   response.json()
    },
    enabled: status==='authenticated',
    retry:false,
 })
  return (
    <NavigationMenu className='bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 w-full max-w-full flex-none px-[max(1rem,calc((100%_-_80rem)_/_2))] py-3'>
      <NavigationMenuList className='justify-between'>

       <Link href='/' className='shrink-0'>
         <Image src={logo} alt='Fresh Cart' />
       </Link>

       <form onSubmit={handleSearch} className='hidden md:flex flex-1 max-w-md mx-4 items-center rounded-full border border-gray-200 bg-gray-50 pl-4 pr-1 py-1 focus-within:border-green-600'>
         <input
           value={searchTerm}
           onChange={(e)=>setSearchTerm(e.target.value)}
           placeholder='Search for products, brands and more...'
           className='flex-1 min-w-0 bg-transparent outline-none text-sm py-1.5'
         />
         <button type='submit' aria-label='Search' className='bg-green-600 hover:bg-green-700 text-white rounded-full size-8 flex items-center justify-center cursor-pointer'>
           <Search className='size-4' />
         </button>
       </form>

<div className="md:flex gap-4 hidden">
  
    <NavigationMenuItem>
          <Link className="font-semibold hover:text-green-800" href='/'>Home</Link>
        </NavigationMenuItem>
           <NavigationMenuItem>
          <Link className="font-semibold hover:text-green-800" href='/shop'>Shop</Link>
        </NavigationMenuItem>
           <NavigationMenuItem>
          <Link className="font-semibold hover:text-green-800" href='/brands'>Brands</Link>
        </NavigationMenuItem>
           <NavigationMenuItem>
          <NavigationMenuTrigger className="font-semibold hover:text-green-800 bg-transparent">Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-80 grid-cols-2 gap-1 p-1">
              <li className="col-span-2">
                <NavigationMenuLink render={<Link href='/categories'>All Categories</Link>} />
              </li>
              {categoriesData?.data?.map((category)=>(
                <li key={category._id}>
                  <NavigationMenuLink render={<Link href={`/categories/${category._id}`}>{category.name}</Link>} />
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
</div>


<div className="md:flex gap-4 lg:gap-5 items-center hidden shrink-0">
  <div className='hidden xl:flex items-center gap-2 text-xs leading-tight text-gray-600'>
    <span className='size-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center'>
      <Headset className='size-4' />
    </span>
    <div>
      <p>Support</p>
      <p className='font-semibold text-gray-800'>24/7 Help</p>
    </div>
  </div>

  {status==="authenticated" ? <>
    <Link className="text-sm font-semibold hover:text-green-800" href='/allorders'>Orders</Link>

    <Link href='/wishList' aria-label='Wishlist' className='relative text-gray-700 hover:text-green-700'>
      <Heart className='size-6' />
      {!!wishlistData?.count && (
        <span className='absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[11px] font-semibold flex items-center justify-center'>
          {wishlistData.count}
        </span>
      )}
    </Link>

    <Link href='/cart' aria-label='Cart' className='relative text-gray-700 hover:text-green-700'>
      <ShoppingCart className='size-6' />
      {!!cartData?.numOfCartItems && (
        <span className='absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-green-600 text-white text-[11px] font-semibold flex items-center justify-center'>
          {cartData.numOfCartItems}
        </span>
      )}
    </Link>

    <Link href='/profile' aria-label='Profile' className='size-9 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center'>
      <User className='size-5' />
    </Link>

    <Button onClick={handleLogout} className='text-sm font-semibold text-gray-700 hover:text-green-700 cursor-pointer'>
      Logout
    </Button>
  </> : <Link href='/login' className='bg-green-600 hover:bg-green-700 py-2 px-4 text-white text-sm font-semibold rounded-full'>Sign In</Link>}
</div>


        <NavigationMenuItem className='md:hidden'>
          <NavigationMenuTrigger><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
</svg>
</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              <ListItem href="/" title="Home">
                <Link href='/'>Home</Link>
              </ListItem>

              <ListItem href="/shop" title="Shop">
                <Link href='/shop'>Shop</Link>
              </ListItem>

                <ListItem href="/brands" title="Brands">
                <Link href='/brands'>Brands</Link>
              </ListItem>

                <ListItem href="/categories" title="Categories">
                <Link href='/categories'>Categories</Link>
              </ListItem>

              {status==="authenticated" && <ListItem href="/allorders" title="Orders">
                <Link href='/allorders'>Orders</Link>
              </ListItem>}

              {status==="authenticated" && <ListItem href="/profile" title="Profile">
                <Link href='/profile'>Profile</Link>
              </ListItem>}

              {status==="authenticated" && <ListItem href="/wishList" title="Wishlist">
                <Link href='/wishList'>Wishlist</Link>
              </ListItem>}

              {status==="authenticated" && <ListItem href="/cart" title="Cart">
                <Link href='/cart'>Cart</Link>
              </ListItem>}

              {status==="authenticated" && <li>
                <button onClick={handleLogout} className='w-full text-left p-2 text-sm font-medium cursor-pointer'>Logout</button>
              </li>}

              {status!=="authenticated" && <ListItem href="/login" title="Sign In">
                <Link href='/login'>Sign In</Link>
              </ListItem>}

              {status!=="authenticated" && <ListItem href="/register" title="Register">
                <Link href='/register'>Register</Link>
              </ListItem>}
            
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>









    



      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink render={<Link href={href}><div className="flex flex-col gap-1 text-sm">
          <div className="leading-none font-medium">{title}</div>
          <div className="line-clamp-2 text-muted-foreground">{children}</div>
        </div></Link>} />
    </li>
  )
}
