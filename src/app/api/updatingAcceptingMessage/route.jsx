import Connection from "@/connection/config"
import { getServerSession } from "next-auth";
import option from "../auth/[...nextauth]/option";
import User from "@/models/user";
import { NextResponse } from "next/server";



export const PUT = async (NextRequest) => {
    try {

        Connection();

        const body = await NextRequest.json()
        const {checked} = body;
        console.log("accept krle ",checked)


        const session = await getServerSession(option)
        const userEmail = session?.user?.email;
        
        const updateUser = await User.findOneAndUpdate({email:userEmail},{
            $set:{
                isAcceptingMessage:checked
            }
        })
         return NextResponse.json({message:"updated Succesfully",status:true})
        
        
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error",status:false})

    }
}