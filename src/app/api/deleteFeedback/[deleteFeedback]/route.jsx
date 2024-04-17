import Connection from "@/connection/config";
import Message from "@/models/message";
import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';

export const DELETE = async (NextRequest) => {
  try {
    await Connection();
    const feedBackId = NextRequest.nextUrl.searchParams.get('delete'); 


    
    const deletingFeedback = await Message.deleteOne({ _id: new ObjectId(feedBackId) });

    if (deletingFeedback.deletedCount === 1) {
      return NextResponse.json({ message: "Feedback deleted successfully",status:true });
    } else {
      return NextResponse.json({ message: "Feedback not found" ,status:false});
    }
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: "Internal Server Error" ,status:false});
  }
};