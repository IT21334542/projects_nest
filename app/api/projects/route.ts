import { ProjectValidationSchema } from "@/app/ValidationSchemas/ProjectValidationSchema";
import prisma from "@/prisma/PrismaClient"
import { NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto";

export async function GET(req:NextRequest) 
{
    try {
        const Spaces =await prisma.project.findMany({
            include:{
                Ownerid:true,
                Tasks:true,
                Collabrators:{
                    include:{
                        userID:true,
                        roleid:true
                    }
                },
                
            }
        })
    
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
    const Roleid  =await randomUUID();
    const ColabID  =await randomUUID();
    
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


        if(ProjectNew)
        {
            const ProjectOwner = await prisma.projectRole.create({
                data:{
                    id:Roleid,
                    name:"Project Owner",
                    projectid:ProjectNew.id
                }
            })


            const Collabrator = await prisma.collabrators.create({
                data:{
                    id:ColabID,
                    projectId:ProjectNew.id,
                    userid:ProjectNew.OwnerId,
                    projectRoleId:ProjectOwner.id
                }
            })


            return NextResponse.json({
                message : "Project Created Successfully",
                CreatedSpace:ProjectNew
            },{status:201})
        }


    } catch (error) {
        
        return NextResponse.json({
            ErrorCode : "Failed in db level",
            Errors:error
           },{status:400})

        
    }

}