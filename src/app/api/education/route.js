import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Education from "@/lib/models/education";

export async function GET() {
  try {
    await dbConnect();
    const education = await Education.find({}).sort({ startDate: -1 });
    return NextResponse.json({ success: true, data: education });
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
    const education = await Education.create(body);
    return NextResponse.json(
      { success: true, data: education },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
