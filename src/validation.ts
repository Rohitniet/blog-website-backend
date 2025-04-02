import {object, z} from "zod"

export const signup_zod= z.object({
    email: z.string().email(),
    password: z.string().min(5),
    username:z.string().min(3).max(15)
})

export const signin_zod= z.object({
    email: z.string().email(),
    password: z.string().min(5),
   
})

export const blog_zod =z.object({
    title : z.string(),
    content :z.string(),
    
})