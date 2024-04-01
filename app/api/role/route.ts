
import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const VCS = z.object({
    id:z.string().min(1,"id is mmust"),
    name:z.string().min(1,"name is required"),
    spaceId:z.string().min(1,"space is must"),
    
})

export async function POST(req:NextRequest) {

    const body = await req.json();

    const valid = await VCS.safeParse(body);

    if(!valid.success)
    return NextResponse.json(
    {
        errorCode:"BAd Request",
        error:valid.error.errors
    })


    try {
        const nRole = await prisma.spaceRole.create({
            data:body
        })

        return NextResponse.json({
            message:"Role created",
            data:nRole
        },{status:201})
    
    } catch (error) {

        return NextResponse.json({
            errorCode:"DB error",
            errors:error
        },{status:400})
        
    }
    
}

interface Reqe{
    searchParams:{spaceid:string}
}


export async function GET(req:NextRequest,{searchParams:{spaceid}}:Reqe) {

   

    if(!spaceid)
    return NextResponse.json({
        errorCode:"Bad Request",
        error:"ID is undefined"

    })

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


