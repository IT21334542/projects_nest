import prisma from "@/prisma/PrismaClient";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const {searchParams} =await new URL(request.url);

    try {
        
        const Invite = await prisma.colleague.findMany({
            where:{
                invite:"PENDING",
                email:searchParams.get("id")!,
            },
            include:{
                spaceId:{
                    include:{
                        createduser:true
                    }
                },
                roleId:true
            }
        })
    
        if(!Invite)
        return NextResponse.json({
            errorCode:"Not Found",
            error:"USER NOT FOUND"
        },{status:404})
    
    
    
    
    
    
    
        return NextResponse.json({
            message:"Found ERi",
            data:Invite
        },{status:200})
    } catch (error) {

        return NextResponse.json({
            message:"Found Not ERi",
            er:error
        },{status:400})
        
    }
}



//Accept REQUEST
export async function PATCH(request:NextRequest) {
    
    const {searchParams} = new URL(request.url);
    const Uid = searchParams.get('Uid');
    const Iid = searchParams.get('Iid');
    const session =await getServerSession();
    const User = session?.user;
    try{
    const INVITE = await prisma.colleague.findFirst({
        where:{
            invite:"PENDING",
            email:User?.email!,
            id:Iid!
        },
        include:{
            roleId:true
        }
    })

    const UPDATEDINVITE = await prisma.colleague.update({
        where:{
            id:INVITE?.id
        },
        data:{
            id:INVITE?.id,
            email:INVITE?.email,
            invite:"ACCEPTED",
            roleid:INVITE?.roleid,
            spaceid:INVITE?.spaceid,
            userid:Uid
        }
    })

    if(INVITE?.roleId.name.toLocaleLowerCase().includes("admin"))
    {
        await prisma.user.update({
            where:{
                id:Uid!
            },
            data:{
                isAdmin:true,
                
            }
        })

        return NextResponse.json({
            Message:"Invite Accepted",
            message:UPDATEDINVITE
        },{status:200})
    }

    }catch(err)
    {
        console.log("Err "+ err);
        return NextResponse.json({
            errorCode:"DB error",
            message:err
        },{status:400})
    }
    
    
    
    
}