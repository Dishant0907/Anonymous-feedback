import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

import option, {authOptions} from "@/app/api/auth/[...nextauth]/option"
import User from "@/models/user";
import Message from "@/models/message";
import Connection from "@/connection/config";

export const GET = async() => {
    try {
        Connection()
        const session = await getServerSession(option)
    const userEmail = session?.user?.email;
    
    const currentUser = await User.findOne({email:userEmail});

    if(!currentUser){
        return NextResponse.json({message:"user not found",status:false})
    }


    const allFeedback = await Message.find({for:currentUser.username})
    console.log(allFeedback)

    return NextResponse.json({currentUser,allFeedback,message:"User found",status:true})

    } catch (error) {
        return NextResponse.json({message:"Internal Server Error",status:false})

    }

}