
import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from 'resend';
import WelcomeTemplate from "@/emails/WelcomeTemplate";
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
    const resend = new Resend(process.env.RESEND_EMAIL_API);
    const valid =await ValidationSchema.safeParse(Body);

    if(!valid.success)
    return NextResponse.json({
        errorCode:"Bad Request",
        error:valid.error

    })


    try {
        
        const colle = await prisma.colleague.create({
            data:Body,
            include:{
                roleId:true,
                spaceId:{
                    include:{
                        createduser:true
                    }
                }
            }
        })

        const R = await resend.emails.send({
            from:"Canvonest <donot-reply@wie-solutions.co.uk>",
            to:colle.email,
            subject:"Invitation",
            react:WelcomeTemplate({
                email:colle.email,
                ownername:colle.spaceId.createduser.name!,
                role:colle.roleId.name,
                spacename:colle.spaceId.name 
            })
        })
        if(R.error)
            console.error("Mail error"+R.error.message);

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
