import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request){
    const jwt = request.cookies.get('myTokenName')
    console.log(jwt);
        //si no esta la cookie de auth me redirecciona a login
        if(!jwt) return NextResponse.redirect(new URL('/Login', request.url))
        
        try {
            await jwtVerify(jwt.value, new TextEncoder().encode('secret'))
            return NextResponse.next()
        } catch (error) {
            //token no valido
            return NextResponse.redirect(new URL('/Login', request.url))
        }
}

export const config = {
    matcher: ['/DashBoard', '/']
}
