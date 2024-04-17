import Connection from "@/connection/config"

import { NextResponse } from "next/server"

export const GET = () => {
    try {
        Connection();

        

        

    } catch (error) {
        return NextResponse.json({message:"Internal Server Error",status:false})
    }
}