import prisma from "@/prisma/PrismaClient";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest){
    const {searchParams} = new URL(request.url);
    const Userid = searchParams.get("id");


    try {
        
        const User = await prisma.user.findFirst({
            where:{
                id:Userid!
            },
            include:{
                Space:true
            }
        })

        if(User)
        {
            
        }

    } catch (error) {
        
    }
}