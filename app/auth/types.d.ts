import nextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import {User} from 'prisma/prisma-client'

declare module "next-auth"
{
    interface Session{
        user : User
    }
}


declare module "next-auth/jwt"{
    type JWT = User
}