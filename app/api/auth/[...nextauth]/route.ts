import NextAuth from "next-auth"
import AuthOption from "./AuthOption"


const handler = NextAuth(AuthOption)

export { handler as GET, handler as POST }