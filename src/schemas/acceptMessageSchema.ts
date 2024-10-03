import {boolean, z} from 'zod'

export const acceptMessageSchema=z.object({
    acceptMessage: z.boolean(),
    
}) 

export type acceptMessageSchema=z.infer<typeof acceptMessageSchema>