import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getMongoDBUserIDOfLoggedInUser } from "@/actions/users";
import BookingModel from "@/models/booking-model";
import { auth } from "@clerk/nextjs/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const mongoUserId = await getMongoDBUserIDOfLoggedInUser();
    const reqBody = await request.json();
    reqBody.user = mongoUserId;
    await BookingModel.create(reqBody);
    return NextResponse.json(
      { message: "Event booked successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}