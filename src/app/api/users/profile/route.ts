import {connectToDatabase} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextResponse,NextRequest } from 'next/server'
import { getDataFromToken } from '@/helpers/getDataFromToken'




connectToDatabase()

export async function POST(request:NextRequest){
    try {

        //Extract data from token

        const userId=await getDataFromToken(request)

        const user=await User.findOne({_id:userId}).select("-password")

        //Check if there is no user

        return NextResponse.json({
            message:"User Found",
            data:user
        })
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
}