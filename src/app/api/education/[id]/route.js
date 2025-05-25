import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Education from "@/lib/models/education";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const education = await Education.findById(id);

    if (!education) {
      return NextResponse.json(
        { success: false, error: "Education not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: education });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const body = await request.json();
    body.updatedAt = Date.now();

    const education = await Education.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!education) {
      return NextResponse.json(
        { success: false, error: "Education not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: education });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const education = await Education.findByIdAndDelete(id);

    if (!education) {
      return NextResponse.json(
        { success: false, error: "Education not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
