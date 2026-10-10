import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';

export let loginSchema= zod.object({

  email:zod.string().nonempty('Name Req').email('Invalid Email') ,
  password:zod.string().nonempty('Password Req').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Invalid Password'),
 

})