import {z} from "zod"

export const signupInputs = z.object({
    username : z.string(),
    email : z.string().email(),
    password : z.string()
})

export const signinInputs = z.object({
    email : z.string().email(),
    password : z.string()
})

export const blogInputs = z.object({
    title : z.string(),
    content : z.string(),

})


export type SignupInputs = z.infer<typeof signupInputs>
export type SigninInputs = z.infer<typeof signinInputs>
export type BlogInputs = z.infer<typeof blogInputs>