import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";









import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    
   
    const token = req.nextauth.token;
    
    
    

    console.log(req.nextUrl.pathname)
    const pathName = req.nextUrl.pathname;

    const publicPath = ['/login','/signup'];


    if(publicPath.includes(pathName) && !token ){
        return NextResponse.redirect(new URL("/login",req.url))

    }
    if(!publicPath.includes(pathName) && !token){
        return NextResponse.redirect(new URL("/login",req.url))
    }

    if(publicPath.includes(pathName) && token){

        return NextResponse.redirect(new URL("/dashboard",req.url))
    }

    

    

  },
  
  
  {     
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)


export const config= {
    matcher:["/dashboard"]
}


    

    
    

    




// export default middleware = async(request) =>{

//     const secret = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET


//     // Connection();
//     // console.log('chill')

//     console.log('route:',request.nextUrl.pathname)

//     const pathVariable = request.nextUrl.pathname;

    

//     const publicPath = ['/login','/signup'];

//     const adminChecking = ['/adminfront/login'];

    

    

    

//     // const auth = request.cookies.get('next-auth.session-token') ||"";
//     const token = await getToken({ req:request,secret:secret,raw:true })
//     console.log('meow')
//     // console.log(request.nextauth.token.role)
//     console.log(token)
//     console.log(secret)
  

//     console.log('meow')

//     // console.log(auth)

    

    
    

    

//     if(publicPath.includes(pathVariable) && token){
//         return NextResponse.redirect(new URL("/dashboard",request.url))


//     }


  
//     if(!publicPath.includes(pathVariable) && !token){
//         return NextResponse.redirect(new URL("/login",request.url))


//     }

//     if(true){
//         return null
//     }

   

    

// }

