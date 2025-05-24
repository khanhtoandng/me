import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SocialLink from "@/lib/models/socialLink";

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const socialLink = await SocialLink.findById(params.id);

    if (!socialLink) {
      return NextResponse.json(
        { success: false, error: "Social link not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: socialLink,
    });
  } catch (error) {
    console.error("Error fetching social link:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();

    const body = await request.json();

    const socialLink = await SocialLink.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!socialLink) {
      return NextResponse.json(
        { success: false, error: "Social link not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: socialLink,
      message: "Social link updated successfully",
    });
  } catch (error) {
    console.error("Error updating social link:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    const socialLink = await SocialLink.findByIdAndDelete(params.id);

    if (!socialLink) {
      return NextResponse.json(
        { success: false, error: "Social link not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Social link deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting social link:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
