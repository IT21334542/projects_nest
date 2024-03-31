import { ProjectValidationSchema } from "@/app/ValidationSchemas/ProjectValidationSchema";
import prisma from "@/prisma/PrismaClient"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest) 
{
    try {
        const Spaces =await prisma.project.findMany()
    
        return NextResponse.json({
            message:"Request Sucess",
            data:Spaces
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            ErrorCode : "Failed in db level",
            Errors:error
           },{status:400})
        
    }
}

export async function POST(req:NextRequest) {

    const body =await req.json();
    
    const validation = await ProjectValidationSchema.safeParse(body)
    if(!validation.success)
    {
       return NextResponse.json({
        ErrorCode : "Bad Request",
        Errors:validation.error.errors
       },{status:400})
    }
    
    try {
        
        const ProjectNew = await prisma.project.create({
            data:{
                id:body.id,
                name:body.name,
                description:body.description,
                spaceId:body.spaceId,
                OwnerId:body.OwnerId
            }
        })

        return NextResponse.json({
            message : "Project Created Successfully",
            CreatedSpace:ProjectNew
        },{status:201})

    } catch (error) {
        
        return NextResponse.json({
            ErrorCode : "Failed in db level",
            Errors:error
           },{status:400})

        
    }





    
}