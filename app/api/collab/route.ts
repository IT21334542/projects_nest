import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { Collabrators } from "prisma/prisma-client";

export async function POST(req:NextRequest){
    const Id = await randomUUID();
    const {searchParams} = new URL(req.url);
    const project = searchParams.get('project');
    const user = searchParams.get('user');
    const role = searchParams.get('projectrole');


    if(!project ||!user)
    {
        return NextResponse.json({
            errorCode: "Bad Request",
            error:"Missing Paramas"

        },{status:400})
    }


    try{

        const COllab = await prisma.collabrators.create({
            data:{
                id:Id,
                projectId:project,
                userid:user,
                projectRoleId:role
    
            }
        })

        return NextResponse.json({
            message:"Creation SUceess",
            data:COllab
        },{status:201})



    }catch(er){
        return NextResponse.json({
            errorCode: "DB Fault",
            error:er

        },{status:400})
    }
}



export async function GET(req:NextRequest){
    const {searchParams} =await new URL(req.url);
    const ProjId = searchParams.get('project');


    if(!ProjId)
    {
        return NextResponse.json({
            errorCode: "Bad Request",
            error:"Missing Paramas"

        },{status:400})
    }


    const ColbList : Collabrators[]  = await prisma.collabrators.findMany({
        where:{
            projectId:ProjId
        },
        include:{
            userID:true,
            projectid:true,
            roleid:true
        }
    })


    if(ColbList.length == 0)
    {
        return NextResponse.json({
            errorCode: "NO data found",
            error:"No Match found"

        },{status:404})
        
    }


    if(ColbList)
    {
        return NextResponse.json({
            message: " Fetch success",
            data:ColbList

        },{status:200})
        
    }


    


}