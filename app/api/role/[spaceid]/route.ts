import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params:{spaceid}}:{params:{spaceid:string}}) {



    try {
        
        const Roles = await prisma.spaceRole.findMany({
            where:{
                spaceId:spaceid
            }
        });

        return NextResponse.json({
            message:"ROle fetched successful",
            data:Roles
        },{status:200})


    } catch (errr) {
        return NextResponse.json({
            errorCode:"DB error",
            error:errr
        },{status:400})
    }
 
}