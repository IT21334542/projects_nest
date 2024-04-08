import prisma from "@/prisma/PrismaClient";
import { error } from "console";
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
                projectid:{
                    include:{
                        spaceid:true
                    }
                },
                assignedTo:{
                    include:{
                        userID:true
                    }
                },
                assignedBy:true,
                subtask:true,
                Files:true,

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



export async function PATCH(req:NextRequest) {
    const body =await req.json();
    const {searchParams} = new URL(req.url);
    const desckPatch = searchParams.get('Disc');

    if(desckPatch)
        {
            try {
                const newTASk = await prisma.tasks.update({
                    where:{
                        id:body.id
                    },
                    data:{
                        description:body.description

                    }
                });

                if(newTASk)
                    {
                        return NextResponse.json({
                            message:"updated Success",
                            data:newTASk
                        },{status:200})
                    }

            } catch (error) {
                return NextResponse.json({
                    errorCode:" DB ERROR",
                    error:error
                },{status:500})
                
            }
    }


   


    
}