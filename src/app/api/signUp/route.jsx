
import Connection from "@/connection/config"
import User from "@/models/user";
import { NextResponse } from "next/server"
import bcrypt from "bcrypt";
import { sendEmail } from "@/helper/sendEmail";

export const POST = async (NextRequest) => {
    try {
        await Connection();
        const body = await NextRequest.json();
        const { email, username, password } = body;

        const userWithEmailExist = await User.findOne({ email });
        if (userWithEmailExist) {
            return NextResponse.json({ message: "User already exists", status: false });
        }

        else {
            const otpGenerating = Math.floor(100000 + Math.random() * 900000);
            
            
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                email,
                username,
                password: hashedPassword,
                isVerified: false,
                verifiedCodeExpiry: expiryDate,
                isAcceptingMessage: true,
                verifiedCode: otpGenerating,
            });

            await newUser.save();
            await sendEmail();
        }

        return NextResponse.json({ message: "User saved Successfully", status: true });
    } catch (err) {
        console.error("Error saving user:", err);
        return NextResponse.json({ message: "Internal Server error", error: err.message });
    }
};