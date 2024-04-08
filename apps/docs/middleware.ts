import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value || "";

    
    const pathsRequiringAuth = ["/publishBlogs", "/myblogs", "/blogs"];

   
    if (pathsRequiringAuth.includes(path) && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    
    const isLoginOrSignup = path === "/login" || path === "/signup";
    if (isLoginOrSignup && token) {
        return NextResponse.redirect(new URL('/blogs', request.url));
    }
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher : [
    "/signup",
    "/login",
    "/",
    "/publishBlogs",
    "/blogs",
    "/myblogs",
    "/myblogs[id]",
    "/blogs[id]"
  ]
}