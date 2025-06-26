import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Profile from "@/lib/models/profile";

export async function GET() {
  try {
    await dbConnect();
    // Assuming there's only one profile in the system
    let profile = await Profile.findOne({});

    if (!profile) {
      // Create a default profile if none exists
      profile = await Profile.create({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      });
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();

    const body = await request.json();
    body.updatedAt = Date.now();

    // Assuming there's only one profile in the system
    let profile = await Profile.findOne({});

    if (!profile) {
      profile = await Profile.create(body);
    } else {
      profile = await Profile.findByIdAndUpdate(profile._id, body, {
        new: true,
        runValidators: true,
      });
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
