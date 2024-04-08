import { NextRequest, NextResponse } from "next/server"

export async function GET (req:NextRequest){

    try{
        const userLogout = NextResponse.json({
            message : "user loggedout successfully",
            status : 200
        })
    
        userLogout.cookies.set("token","")
    
        return userLogout
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message : "error while loggingout",
            status : 500,
        })
    }
}