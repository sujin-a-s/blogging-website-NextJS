import { blogInputs } from "@repo/db/zod";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";
import { PrismaClient } from "@repo/db/client";
import { verify } from "jsonwebtoken";
const prisma = new PrismaClient()


export async function POST (req: NextRequest){
    try{
        const reqBody = await req.json()
        const {title,content} = reqBody

        const token = req.cookies.get("token")?.value || ""
        const decodedToken : any = verify(token,process.env.JWT_SECRET!)
        const userId = decodedToken.id

        if(title.length==0 || content.length==0 ){
            return NextResponse.json({
                message : "values cannot be null",
                status : 500,
            })
        }

        const zodValidation = blogInputs.safeParse(reqBody)
        if(!zodValidation.success){
            return NextResponse.json({
                message : "invalid inputs",
                status : 500,
            }) 
        }



        const blog = await prisma.blogs.create({
            data : {
                title : title,
                content : content,
                userId : userId
            
            }
        })

        return NextResponse.json({
            message : "blog posted successfully",
            status : 200,
            blog : blog
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message : "error while posting the blog",
            status : 500
        })
    }
}



export async function DELETE (req: NextRequest){
    await prisma.blogs.deleteMany()
    return NextResponse.json({
        message : "all delted successfuly",
        status : 500
    })
}

export async function GET (req :NextRequest) {

    try{
        const blogs = await prisma.blogs.findMany({
            select : {
                id :true,
                title : true,
                content : true,
                created :true,
                owner : {
                    select : {
                        username : true
                    }
                }
            }
        })

        return NextResponse.json({
            message : "all the blogs retrieved",
            status : 200,
            blogs : blogs
        })
    
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message : "error while retrieving the blogs",
            status : 500
        })
    }
}


