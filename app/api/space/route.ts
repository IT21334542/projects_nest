
import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const SpaceRequestSchema = z.object({
    id:z.string().min(1,"Id is required"),
    name:z.string().min(1,"Name is Required"),
    description:z.string().optional(),
    createdby:z.string()
    
})


export async function POST(req:NextRequest)
{
    const body =await req.json();
    const Validation =await SpaceRequestSchema.safeParse(body);
    
    if(!Validation.success)
    {
       return NextResponse.json({
        ErrorCode : "Bad Request",
        Errors:Validation.error.errors
       },{status:400})
    }

    const SpaceNew = await prisma.space.create({
        data:body
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