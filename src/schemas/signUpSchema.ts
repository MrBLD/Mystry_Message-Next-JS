import {z} from 'zod';

export const usernameValidation=z
.string()
.min(2,"Username must be at least two charecters")
.max(20, "username must be less than 20 char")
.regex(/^[a-zA-Z0-9_]+$/,"username must not contain special char")

export const sigUpSchema=z.object({
    username: usernameValidation,
    email: z.string().email(),
    password: z.string().min(6,{message: "Password must be at least 6 char"})
})