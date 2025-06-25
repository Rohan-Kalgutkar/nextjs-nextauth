import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"


export const getDataFromToken=(request:NextRequest)=>{
    try {

        const token=request.cookies.get("token")?.value || ""

        const decodedToken:any=jwt.verify(token,process.env.TOKEN_SECRET!)

        console.log(decodedToken)

        return decodedToken.id  ///Make Sure over here you dont write ._id as this id is taken from Login backend route logic not from Mongo


        
        
    } catch (error:any) {

        throw new Error(error.message)
        
    }

}