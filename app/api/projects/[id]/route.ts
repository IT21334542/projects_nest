import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params:{id}}:{params:{id:string}}){


    try {
        const Projects = await prisma.project.findFirst({
            where:{
                id:id
            },
            include:{
                spaceid:{
                    include:{
                        colleague:{
                            include:{
                                userID:true
                            }
                        }
                    }
                }
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
        },{status:500})
        
    }




}

export async function PATCH(req:NextRequest){
    const body = await req.json();
    const {searchParams} = new URL(req.url);
    const Pid = searchParams.get("project");
    console.log("came to update ")

    if(!Pid)
    {
        console.error("Bad request (missing) : Project unique");
        return NextResponse.json({
            message:"NO project unique",
            data:"No pid"

        },{
            status:400
        })

    }

    try {
        console.log("PID"+Pid+"\n dex"+body.desc)
        await prisma.project.update({
            where:{
                id:Pid
            },
            data:{
                description:body.desc
            }
            
        })

        return NextResponse.json({
            message:"Found Projects",
            data:"PID"+Pid+",dex"+body.desc
        },{status:200})
    
    } catch (error) {

        console.error("Error Db : \t"+error)
        return NextResponse.json({
            errorCode:"DB fail in  projects",
            error:error
        },{status:500})
        
    }
    

}