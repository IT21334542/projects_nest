
import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ValidationSchema = z.object({
    id:z.string().min(1,"id is required"),
    email:z.string({
        required_error:"mail is required"
    }).email("Invaild email"),
    roleid:z.string().optional(),
    spaceid:z.string().min(1,"space id is required")
})

export async function POST(req:NextRequest) {

    const Body = await req.json();

    const valid =await ValidationSchema.safeParse(Body);

    if(!valid.success)
    return NextResponse.json({
        errorCode:"Bad Request",
        error:valid.error

    })


    try {
        
        const colle = await prisma.colleague.create({
            data:Body
        })

        return NextResponse.json({
            message:"Creation Succesful",
            data:colle
        },{status:201})
    } catch (error) {

        return NextResponse.json({
            errorcode: "DB error",
            error:error
        })
        
    }

}
