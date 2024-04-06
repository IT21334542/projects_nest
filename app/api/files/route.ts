import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {


    const { searchParams} = new URL(req.url);
    const spaceid = searchParams.get('space');
    const projectid = searchParams.get('projectid');


    if(!spaceid)
    return NextResponse.json({
        errorcode:"Bad request",
        error:"missing params(spaceid)"
    },{status:400})

    
    try{

        const Resource = await prisma.files.findMany({
            where:{
                spaceId:spaceid,
            }
        })

        return NextResponse.json({
            message:"Success creation",
            data:Resource
        },{status:200})

    }catch(err){
        return NextResponse.json({
            errorcode:"Db error",
            error: err
        },{status:500})

    }



    
}
export async function POST(req:NextRequest) {
    

    const { searchParams} = new URL(req.url);
    const spaceid = searchParams.get('space');
    const projectid = searchParams.get('projectid');

    const body =await req.json();
    
    
    if(!spaceid)
    return NextResponse.json({
errorcode:"Bad request",
error:"missing params(spaceid)"
},{status:400})

if(!body)
{
   
    return NextResponse.json({
    errorcode:"Bad request",
    error:"missing (fileobjects)"
},{status:400})}


    try{

        const Resource = await prisma.files.createMany({
            data:body
        })

        return NextResponse.json({
            message:"Success creation",
            data:Resource
        },{status:201})

    }catch(err){
        console.error("Error db"+ err);
        return NextResponse.json({
            errorcode:"Db error",
            error: err
        },{status:500})

    }
   

   
    
}
export async function DELETE(req:NextRequest) {
    
}