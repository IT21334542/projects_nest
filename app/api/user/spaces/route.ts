import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const {searchParams} = new URL(request.url);
    const Userid = searchParams.get("id");



    try {
        
        const User = await prisma.user.findFirst({
            where:{
                id:Userid!
            },
            include:{
                Space:true,
                colleague:{
                    include:{
                        spaceId:true
                    }
                },
                Collabrators:{
                    include:{
                        projectid:{
                            include:{
                                spaceid:true
                            }
                        }
                    }
                }
            }
        })

        if(User)
        {
            return NextResponse.json({
                message:"User Found",
                data:User
            },{status:200}) 
        }

    } catch (error) {
        return NextResponse.json({
            errorCode:"DB ERROR",
            error:error
        },{status:400})
        
    }
}