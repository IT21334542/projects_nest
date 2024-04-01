import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params:{id}}:{params:{id:string}}){


    try {
        const Projects = await prisma.project.findFirst({
            where:{
                id:id
            }
        })

        return NextResponse.json({
            message:"Found Projects",
            data:Projects
        },{status:200})
        
    } catch (error) {

        return NextResponse.json({
            errorCode:"DB fail in  projects",
            error:error
        },{status:400})
        
    }




}