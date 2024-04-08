import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import { TaskStatus , Tasks} from "prisma/prisma-client";


export  async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const Taskid =  searchParams.get('id');

    if(!Taskid)
    return NextResponse.json({
        errorCode:" BAD REQUEST",
        error:" Missing Parameters(Taskid)"
    },{status:400})


    try{

        const Ts : Tasks | null = await prisma.tasks.findFirst({
            where:{
                id:Taskid
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
                taskname:'asc'
            }
        })

        if(!Ts)
        {
            return NextResponse.json({
                errorcode:"No MAtch data found"
            },{status:400})
        }


        return NextResponse.json({
            message:"Found match",
            data:Ts
        },{status:200})

        

    }catch(e){
        return NextResponse.json({
            errorCode:" DB ERROR",
            error:e
        },{status:500})

    }

}
