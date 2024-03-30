import {withAuth} from "next-auth/middleware"

export default withAuth({
   callbacks:{
    authorized: async ({req,token})=>{


        if(req.nextUrl.pathname.startsWith('/master'))
            return (token?.isMaster==true)
        return true;
    }
   }
})

export const config = {
    matcher:['/master/:path*',"/"]
}