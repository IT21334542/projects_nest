
import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import { SpaceCreateSchema } from "../../ValidationSchemas/SpaceValidationSchema";



export async function POST(req:NextRequest)
{
    
    const body =await req.json();
    const Validation =await SpaceCreateSchema.safeParse(body);
   
    
    if(!Validation.success)
    {
       return NextResponse.json({
        ErrorCode : "Bad Request",
        Errors:Validation.error.errors
       },{status:400})
    }

   

    const SpaceNew = await prisma.space.create({
        data:{
            id:body.id,
            name:body.name,
            description:body.description,
            createdby:body.createdby
        }
    })

    return NextResponse.json({
        message : "Space Created Successfully",
        CreatedSpace:SpaceNew
    },{status:201})
    
}

export async function GET(req:NextRequest) 
{
    const Spaces =await prisma.space.findMany()

    return NextResponse.json({
        message:"Request Sucess",
        data:Spaces
    },{status:200})
    
}