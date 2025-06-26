import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Experience from "@/lib/models/experience";

export async function GET() {
  try {
    await dbConnect();
    const experiences = await Experience.find({}).sort({ startDate: -1 });
    return NextResponse.json({ success: true, data: experiences });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const experience = await Experience.create(body);
    return NextResponse.json(
      { success: true, data: experience },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
