import { connectDB } from "@/config/dbConfig";
import EventModel from "@/models/event-model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PUT(
  request: NextRequest,
  { params }: { params: { eventid: string } }
) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const reqBody = await request.json();
    await EventModel.findByIdAndUpdate(params.eventid, reqBody);
    return NextResponse.json(
      { message: "Event updated successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { eventid: string } }
) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await EventModel.findByIdAndDelete(params.eventid);
    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}