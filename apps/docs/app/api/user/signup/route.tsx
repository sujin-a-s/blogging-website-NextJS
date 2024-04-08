import { PrismaClient } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import { signinInputs, signupInputs} from "@repo/db/zod"

const prisma = new PrismaClient()
var bcryptjs = require("bcryptjs")

export async function POST (req:NextRequest) {
    try{
        const reqBody = await req.json()
        const{username ,email ,password} = reqBody
        const zodValidation = await signupInputs.safeParse(reqBody)
        if(!zodValidation.success){
            return NextResponse.json({
                message : "invalid inputs",
                status : 500
            })
        }
        const existingUser = await prisma.user.findUnique({
            where : {
                email : email
            }
        })
    
        if(existingUser){
            return NextResponse.json({
                message : "user already regsitered . Please sign in",
                status : 500
            })
        }
        
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)
        const newUser = await prisma.user.create({
            data : {
                username : username,
                email : email,
                password : hashedPassword
            }
        })
    
        return NextResponse.json({
            message : "user signedup successfully",
            status : 200
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message : "error while signingup",
            status : 500
        })
    }
}




