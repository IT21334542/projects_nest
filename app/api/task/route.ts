import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import { string, z } from "zod";

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

    const validation = await TaskRequestValidation.safeParse(body);

    if(!validation.success)
    {
        return NextResponse.json({
            errorCode: "Bad Request",
            error:validation.error.errors
        },{status:400})
    }

    try {
        const NewTask =await prisma.tasks.create({
            data:body
        }) 

        return NextResponse.json({
            message:"Succesful creation of teask",
            data:NewTask
        },{status:201})

        
    } catch (error) {
        return NextResponse.json({
            errorCode: "Db error ",
            error:error
        },{status:500})
        
    }
   
}