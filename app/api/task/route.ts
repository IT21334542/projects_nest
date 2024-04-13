import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import { string, z } from "zod";
import { randomUUID } from "crypto";


const TaskRequestValidation = z.object({
    id:z.string().min(1,"Id is must"),
    taskname:z.string().min(1,"name  is must"),
    description:z.string().optional(),
    prority:z.string().optional(),
    projectId:z.string().min(1,"Project id is must"),
    assigned_By:z.string().min(1,"assigned by "),
    assigned_To:z.string().optional()



})

export async function POST(req:NextRequest)
{
    const body =await req.json();
    const {searchParams} = new URL(req.url);
    const Projectid = searchParams.get('project')

    const Taskid =randomUUID();

    if(!Projectid){
        return NextResponse.json({
            errorCode:" BAD REQUEST",
            error:" Missing Parameters(project)"
        },{status:400})

    }



    try{
        const Tasknew = await prisma.tasks.create({
            data:{
                id:Taskid,
                projectId:Projectid!
            }
        })

        return NextResponse.json({
            message:"Created sucess",
            data:Tasknew

        },{status:201});


    }catch(err){
        return NextResponse.json({
            message:"DB error",
            error:err
        },{status:500})
    }
   
}


export  async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const projectid =  searchParams.get('project');

    if(!projectid)
    return NextResponse.json({
        errorCode:" BAD REQUEST",
        error:" Missing Parameters(project)"
    },{status:400})


    try{

        const Tasks : any[] = await prisma.tasks.findMany({
            where:{
                projectId:projectid
            },
            include:{
                assignedTo:{
                    include:{
                        userID:true
                    }
                },
                assignedBy:true,
                subtask:true
            },
            orderBy:{
                createdAt:"asc"
            }
        })

        if(Tasks.length == 0)
        {
            return NextResponse.json({
                errorcode:"No MAtch data found"
            },{status:400})
        }


        return NextResponse.json({
            message:"Found match",
            data:Tasks
        },{status:200})

        

    }catch(e){
        return NextResponse.json({
            errorCode:" DB ERROR",
            error:e
        },{status:500})

    }

}



export async function PUT(req:NextRequest){
    const Body =await req.json();

    
    if(!Body.id)
    {
        return NextResponse.json({
            errorCode:" BAD REQUEST",
            error:" Missing Parameters(taskid)"
        },{status:400})
    }



    try{

        const UpdatedTask = await prisma.tasks.update({
            data:Body,
            where:{
                id:Body.id
            }
        });


        return NextResponse.json({
            message:"Update Success",
            data:UpdatedTask
        },{status:200})

    }catch(err){
        return NextResponse.json({
            errorCode:" DB ERROR",
            error:err
        },{status:500})
    }



    
}