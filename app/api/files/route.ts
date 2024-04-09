import prisma from "@/prisma/PrismaClient";
import { error } from "console";
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
    const Taskid = searchParams.get('taskid');

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

export async function PATCH(req:NextRequest){
    const {searchParams} = new URL(req.url);
    //TASK,SPACE,PROJECT
    const updateaction = searchParams.get("action");
    const body = await req.json();


    if(!body)
        {
            return NextResponse.json({
                message: "missing body params",
                error:"Bad req"
            },{status:400})
        }

    if(updateaction == "Task")
    {
            try {
             body.map(async (fi:any)=>{
                console.log("Server"+JSON.stringify("fi"));
                await prisma.files.update({
                    data:{
                        tasksId:fi.taskid,
                        projectId:fi.projectId
                    },
                    where:{
                        id:fi.id
                    }
                })

             })


             return NextResponse.json({
                message:"Updated Sucess",
                
             },{status:200})

               
            } catch (error) {
                console.error("Error db"+ error);
                return NextResponse.json({
                    errorcode:"Db error",
                    error: error
                },{status:500})
                
            }

    }


    if(updateaction == "RvmTask"){
        try {
            const Updated=await prisma.files.update({
                data:{
                    tasksId:null
                },
                where:{
                    id:body.taskid
                }
            })

            if(Updated)
            return NextResponse.json({
            message:"Updated"},{status:200})
            
        } catch (error) {
            console.error("Error db"+ error);
            return NextResponse.json({
                errorcode:"Db error",
                error: error
            },{status:500})
        }
    }
    


}



export async function DELETE(req:NextRequest) {
    
}