import Connection from "@/connection/config";
import Message from "@/models/message";
import User from "@/models/user";
import { NextResponse } from "next/server";






export const POST = async (NextRequest) => {
    
    try {
        Connection()
        const body = await NextRequest.json()
        const {feedback,username} = body;
        console.log("user ka naam",username)

        const userToFeedback = await User.findOne({username:username})  // finding user to which sending feedback on db
        console.log(userToFeedback)

        if(!userToFeedback){
            return NextResponse.json({message:"User not found",success:false})
        }

        if(userToFeedback.isAcceptingMessage == true){
            const newFeedback = new Message({
                feedback:feedback,
                for:username,
                
            });
            await newFeedback.save()
    

        }
        else {
            return NextResponse.json({message:"not accepting Feedback",success:false})


        }
        

        
       

        return NextResponse.json({message:"Feedback sent Successfully",success:true})
        
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({message:"Internal server error",success:false})
        
    }


}