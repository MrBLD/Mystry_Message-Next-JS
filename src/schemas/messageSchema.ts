import {z} from 'zod'

export const messageSchema=z.object({
    content:z
    .string()
    .min(10,{message:'must be longer than 10 char'})
    .max(300, {message: 'must be less than 300 char'})
}) 

export type messageSchema=z.infer<typeof messageSchema>