import prisma from "@/prisma/PrismaClient";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const AuthOption:AuthOptions = {
    session:{
        strategy:"jwt"
    },
    adapter:PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id:profile.sub,
                    name:profile.given_name+profile.family_name,
                    email:profile.email,
                    image:profile.picture,
                    isMaster:profile.isMaster?profile.isMaster:false
                }
            },
          })
    ],
    callbacks:{
        //called when useSession hook is called or ServerSessionhook called
        async jwt({token,user})
        {
            return {
                ...token,
                ...user
            }
        },
        async session({session,token}) {

             session.user.isMaster = token.isMaster;
             return session;

            
        },
    }

}

export default AuthOption;