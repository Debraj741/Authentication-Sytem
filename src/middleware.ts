import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    // Actual user present in which path?
    const path = request.nextUrl.pathname

    // Public path define
    const isPublicPath = path === "/login" || path === "/signup"

    // How to know user login or not => take token
    const token = request.cookies.get("token")?.value || ""

    // If you are in public path & have token then not access public path now
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.url))
    }

    // If you are in private path and don't having token => redirect to login page
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/verifyemail'
  ]
}