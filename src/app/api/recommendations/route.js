import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Recommendation from "@/lib/models/recommendation";

export async function GET() {
  try {
    await dbConnect();
    const recommendations = await Recommendation.find({}).sort({ date: -1 });
    return NextResponse.json({ success: true, data: recommendations });
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
    const recommendation = await Recommendation.create(body);
    return NextResponse.json(
      { success: true, data: recommendation },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
