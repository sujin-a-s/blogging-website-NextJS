import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@repo/db/client";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient()

export async function GET (req :NextRequest) {

    try{
        const token = req.cookies.get("token")?.value || ""
        const decodedToken : any =  verify(token,process.env.JWT_SECRET!)
        const userId = decodedToken.id

        const blogs = await prisma.blogs.findMany({
            where : {
                userId : userId
            },select : {
                id : true,
                title : true,
                content :true,
                created : true,
                owner : {
                    select : {
                        username : true
                    }
                }
            }
        })

        return NextResponse.json({
            message : "my blogs retrieved",
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





export async function POST(req :NextRequest) {

    try{
        const {id} = await req.json()


        const blogs = await prisma.blogs.delete({
            where : {
                id : id
            }
        })

        return NextResponse.json({
            message : "blog deleted succesfully",
            status : 200,
        })
    
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message : "error while deleting the blog",
            status : 500
        })
    }
}




export async function PUT(req :NextRequest) {

    try{
        const reqBody = await req.json()
        const {id,title,content} = reqBody

        const editedblog = await prisma.blogs.update({
            where : {
                id : Number(id)
            },
            data :{
                title : title,
                content : content
            }
        })

        return NextResponse.json({
            message : "blog edited succesfully",
            status : 200,
            editedblog: editedblog
        })
    
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message : "error while editing the blog",
            status : 500
        })
    }
}