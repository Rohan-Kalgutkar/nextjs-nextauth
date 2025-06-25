import {connectToDatabase} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

import { NextResponse,NextRequest } from 'next/server'

import { sendEmail } from '@/helpers/mailer'


connectToDatabase()

export async function POST(request: NextRequest) {
    try{
        const reqBody=await request.json()
        const {username,email,password}=reqBody

        //Validation

        console.log(reqBody);

        const user=await User.findOne({email})

        if(user){
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt =await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser=new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser= await newUser.save();
        console.log("User created successfully:", savedUser);

        const userId=savedUser._id

        console.log("Saved User ID:"+userId)


        //Send verification email

        await sendEmail({email,emailType:'VERIFY',userId:savedUser._id})

        return NextResponse.json({ 
            message: "User created successfully, please check your email for verification.",
            success: true,
            savedUser
         }, { status: 201 });





    }
    catch(error:any) {
        console.error("Error in POST /api/users/signup:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}