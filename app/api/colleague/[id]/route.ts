import prisma from "@/prisma/PrismaClient"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req:NextRequest,{params:{id}}:{params:{id:string}}) {

   
    try {
        const colle =await prisma.colleague.findMany({
            include:{
               roleId:true,
               userID:true
            },
            where:{
                spaceid:id
            }

        })
        return NextResponse.json({
            message:"Collegues fetched succesful",
            data:colle
        },{status:200})

    } catch (error) {
        return NextResponse.json({
            errorcode: "DB error",
            error:error
        })
    }
    
}