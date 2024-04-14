import prisma from "@/prisma/PrismaClient";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import AuthOption from "../../auth/[...nextauth]/AuthOption";

export async function GET(req:NextRequest,{params:{id}}:{params:{id:string}}){

    if(!id)
    {
        return NextResponse.json({
            ErrorCode:"Invaild PAth",
            Path:id
        },{status:400})
    }


    try {
        const SPace = await prisma.space.findFirst({
            include:{
                Project:{
                    include:{
                        Collabrators:{
                            include:{
                                userID:true
                            }
                        },
                        Ownerid:true
                    }
                }
            },
            where:{
                id:id
            }
        })

        return NextResponse.json({
            message:"SPACE FOUND ",
            data:SPace
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            errorCode:"THE SPACE NOT FOUND",
            error:error
        },{status:404})
        
    }
    
}


export async function PUT(req:NextRequest,{params:{id}}:{params:{id:string}}){

    const Body =await req.json();


    if(!id)
    {
        return NextResponse.json({
            ErrorCode:"Invaild PAth",
            Path:id
        },{status:400})
    }


    try {
        const SPace = await prisma.space.update({
            where:{
                id:id
            },
            data:Body
        })

        return NextResponse.json({
            message:"SPACE UPDATED ",
            data:SPace
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            errorCode:"THE SPACE NOT FOUND",
            error:error
        },{status:404})
        
    }
    
}


export async function PATCH(req:NextResponse) {
    const Session = await getServerSession(AuthOption);
    const {searchParams} = new URL(req.url);
    const Spaceid = searchParams.get("Space");
    const Body = await req.json();

    if(!Session?.user.isMaster)
        return NextResponse.json({
    message:"Not Authorized User"
    },{status:401})
    
    try{

        const a =await prisma.space.update({
            where:{
                id:Spaceid!
            },
            data:{
                iconurl:Body.icon
            }
        })

        return NextResponse.json({
            message:"Success Update"

        },{status:200})
    }catch(e){
        return NextResponse.json({
            message:"DB ERROR",
            data:e

        },{status:500})

    }



    
}

