
import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import { SpaceCreateSchema } from "../../ValidationSchemas/SpaceValidationSchema";
import { getServerSession } from "next-auth";
import { randomUUID, UUID } from "crypto";
import { InviteState } from "prisma/prisma-client";


export async function POST(req:NextRequest)
{
    const Session = await getServerSession();
    const Roleid = randomUUID();
    const colleagueId = randomUUID();
    const body =await req.json();
    const Validation =await SpaceCreateSchema.safeParse(body);
   
    
    if(!Validation.success)
    {
       return NextResponse.json({
        ErrorCode : "Bad Request",
        Errors:Validation.error.errors
       },{status:400})
    }

    if(Session?.user.isMaster)
    {
        return NextResponse.json({
            ErrorCode:"Bad Authentication",
            Error:"User is Not a Master"
        },{status:401})

    }

   

    const SpaceNew = await prisma.space.create({
        data:{
            id:body.id,
            name:body.name,
            description:body.description,
            createdby:body.createdby
        }
    })

    if(SpaceNew){
        const Role = await prisma.spaceRole.create({
            data:{
                id:Roleid,
                name:"Space Owner",
                spaceId:SpaceNew.id
            }

        });


        console.log("Userid"+Session?.user.id)
        const colleague = await prisma.colleague.create({
            data:{
                id:colleagueId,
                email:Session?.user.email!,
                invite: InviteState.ACCEPTED,
                roleid:Role.id,
                spaceid:SpaceNew.id,
                userid:body.createdby

            }
        })

        return NextResponse.json({
            message : "Space Created Successfully",
            CreatedSpace:SpaceNew
        },{status:201})
        
    }
    else{

        return NextResponse.json({
            ErrorCode:"Process Lineup  Failed",
            Error:"SPace in , Process failed"
        },{status:404})


    }

    
}

export async function GET(req:NextRequest) 
{
    const Spaces =await prisma.space.findMany()

    return NextResponse.json({
        message:"Request Sucess",
        data:Spaces
    },{status:200})
    
}