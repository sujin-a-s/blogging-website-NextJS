import { signinInputs } from "@repo/db/zod"
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@repo/db/client"
const prisma = new PrismaClient()
var bcryptjs = require("bcryptjs")
import { sign } from "jsonwebtoken";

export async function POST(req :NextRequest) {

    try{
        const reqBody = await req.json()
        const {email,password} = reqBody
    
        const zodValidation = signinInputs.safeParse(reqBody)
        if(!zodValidation.success){
            return NextResponse.json({
                message : "invalid inputs",
                status : 500
            })
        }
    
        const existingUser = await prisma.user.findFirst({
            where : {
                email : email
            }
        })
    
        if(!existingUser){
            return NextResponse.json({
                message : "user not found . Please Signup",
                status : 500
            })
        }
    
        const validPassword = await bcryptjs.compare(password,existingUser.password)
        if(!validPassword){
            return NextResponse.json({
                message : "invalid password",
                status : 500
            })
        }
    
        const tokenData = {
            id : existingUser.id,
            email : existingUser.email,
            username : existingUser.username,
            password : existingUser.password
        }
    
        const token = await sign(tokenData ,process.env.JWT_SECRET! , {expiresIn: "1d"})
    
        const response = NextResponse.json({
            message : "user logged in successfully",
            status : 200,
            token : token
        })
    
        response.cookies.set("token",token)
    
        return response
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message : "error while loggingin",
            status : 500,
            
        })
    }

}




