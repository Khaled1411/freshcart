'use client'
import { payCash } from '@/api/actions/payment/paycash.action'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'
import { payOnline } from '@/api/actions/payment/payonline.action'

export default function CheckoutForm({cartId}:{cartId:string}) {
 const router=   useRouter()
 const {handleSubmit , control}=   useForm<shippingData>({
        defaultValues:{
            
    details: '',
    phone: '',
    city: '',
    postalCode: '' ,

  
        }
    })

  async  function submitForm(data : shippingData){
     
   const payload = await     payOnline(cartId , data)
        // call api
    //   const payload = await  payCash(cartId , data )

      console.log(payload)

         if(payload.status=='success'){
            toast.add({
            type: "success",
            description: 'Order Created Successfully',
          }) 
           window.location.href=payload.session.url
        
      }
      else{

         toast.add({
            type: "error",
            description: 'Order Failed ',
          }) 

      }
    //   if(payload.status=='success'){
    //         toast.add({
    //         type: "success",
    //         description: 'Order Created Successfully',
    //       }) 
    //     //   window.location.href='http://localhost:3000/'
    //     router.push('/')
    //   }
    //   else{

    //      toast.add({
    //         type: "error",
    //         description: 'Order Failed ',
    //       }) 

    //   }
        

    }
  return (
    <div className='w-1/2 mx-auto my-10 p-10 '>
      <h2>CheckOut </h2>

         <form onSubmit={handleSubmit(submitForm)} >
                    <div className='flex flex-col gap-8'>
      
      
          <Controller
        name="details"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>details</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your details"
              autoComplete="on"
            />
           
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      
        
      
          <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>phone</FieldLabel>
            <Input
              type='text'
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your phone"
              autoComplete="on"
            />
           
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

              <Controller
        name="city"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>city</FieldLabel>
            <Input
              type='text'
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your city"
              autoComplete="on"
            />
           
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

              <Controller
        name="postalCode"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>postalCode</FieldLabel>
            <Input
              type='text'
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your postalCode"
              autoComplete="on"
            />
           
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      
      
      
                    
                  </div>
                  <Button type='submit' className='w-full bg-green-600 my-4 hover:bg-green-600'> Login Now</Button>
              </form>
    </div>
  )
}



export interface shippingData{
       details: string,
    phone: string,
    city: string,
    postalCode: string
}