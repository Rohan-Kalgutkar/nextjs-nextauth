import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { error } from "console";

import { NextResponse, NextRequest } from "next/server";
import { use } from "react";

connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { token } = reqBody;

    console.log("Token:" + token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      throw NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    }

    console.log("User Is:", user);

    user.isVerified = true;

    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "Email verified successfully",
        sucess: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
