import {withAuth} from "next-auth/middleware"

export default withAuth({
   callbacks:{
    authorized: async ({req,token})=>{


        if(req.nextUrl.pathname.match('/space/create'))
            return (token?.isMaster==true)
        if(req.nextUrl.pathname.startsWith('/project/create/'))
            return (token?.isMaster==true || token?.isAdmin == true)
        
        return true;
    }
   }
})

export const config = {
    matcher:['/master/:path*',"/:path*"]
}