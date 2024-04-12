import prisma from "@/prisma/PrismaClient";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { use } from "react";

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
                    name:profile.given_name+" "+profile.family_name,
                    email:profile.email,
                    image:profile.picture,
                    isMaster:profile.isMaster?profile.isMaster:true,
                    isAdmin:profile.isAdmin?profile.isAdmin:false
                    
                }
            },
          })
    ],
    callbacks:{
      
        async signIn({user,account,profile}) {
        
            const {email} = user;
            return true
        },

        async redirect({url,baseUrl}) {

            return baseUrl
        },
          //called when useSession hook is called or ServerSessionhook called
        async jwt({token,user})
        {
            return {
                ...token,
                ...user
            }
        },
        async session({session,token,user}) {

            session.user.id = user.id;
            session.user.isMaster = token.isMaster;
            session.user.isAdmin = token.isAdmin;
            return session;
        },
    }

}

export default AuthOption;