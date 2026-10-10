import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';

export let schema= zod.object({
  name:zod.string().nonempty('Name Req').min(3 , 'Min 3 Letters').max(5 , 'Max 5 letters') ,

  email:zod.string().nonempty('Name Req').email('Invalid Email') ,
  password:zod.string().nonempty('Password Req').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Invalid Password'),
  rePassword:zod.string().nonempty('rePassword Req') ,
 
  phone:zod.string().nonempty('Phone Req').regex(/^01[0125][0-9]{8}$/,'Invalid Phone'),

}).refine((obj)=>{
  if(obj.password === obj.rePassword){
    return true
  }
  else{
    return false
  }
} , {path : ['rePassword'] , message:'not matched'})