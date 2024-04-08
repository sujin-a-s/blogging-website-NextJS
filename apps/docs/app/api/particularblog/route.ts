import { PrismaClient } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const requestBody = await req.text(); 
        if(!requestBody){
            return NextResponse.json({
                message: "req body is empty",
                status: 400 
            });
        }   
        const { id } = JSON.parse(requestBody); 

        if (!id) {
            return NextResponse.json({
                message: "Missing ID in request body",
                status: 400 
            });
        }

        const particularBlog = await prisma.blogs.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                title: true,
                content: true,
                created: true,
                owner: {
                    select: {
                        username: true
                    }
                }
            }
        });

        if (!particularBlog) {
            return NextResponse.json({
                message: "Blog not found",
                status: 404
            });
        }

        return NextResponse.json({
            message: "Particular blog retrieved successfully",
            status: 200,
            particularBlog: particularBlog
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Error while retrieving the particular blog",
            status: 500
        });
    }
}