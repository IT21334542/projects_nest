import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import { ProjectRole } from "prisma/prisma-client";

export async function GET(req:NextRequest){

    const {searchParams} = await new URL(req.url);
    const Projectid = searchParams.get('project');

   try{
    const Roles:ProjectRole[] = await prisma.projectRole.findMany({
        where:{
            projectid:Projectid!
        }
    })

    if(Roles.length == 0)
    return NextResponse.json({
        errorCode : "No ROles FOund",
        err:"Not Found "

    },{status:404})

    return NextResponse.json({
        message:"Found",
        data:Roles

    },{status:200})
   }catch(e){
    return NextResponse.json({
        errorCode : "DB err",
        err:e

    },{status:400})
   }
    
}