import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

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


