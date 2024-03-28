import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const AuthOption:AuthOptions = {
    session:{
        strategy:"jwt"
    },
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
          })
    ]

}

export default AuthOption;