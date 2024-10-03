import {z} from 'zod'

export const verifySchema=z.object({
    code:z.string({required_error:"code is required"}).length(6,"code is not valid")
})