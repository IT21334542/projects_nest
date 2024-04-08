import prisma from "@/prisma/PrismaClient";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const Body  =await req.json();
    const id = randomUUID()

    if(!Body)
        {
            return NextResponse.json({
                messg: "No valid request",
                error:" no id, parentataskid"
            },{status:400})
        }

        try {
            
            const NewStask = await prisma.subtask.create({
                data:{
                    id:id,
                    tasksId:Body.task
                }
            })


            if(NewStask)
                {
                    return NextResponse.json({
                        message: "Creation successful",
                        data:NewStask
                    },{status:201});
                }


        } catch (error) {

            console.error("Error db subtask"+error);
            return NextResponse.json({
                mess:"err db",
                error:error
            },{status:500})
        }


    



    
}