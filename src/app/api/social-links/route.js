import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SocialLink from "@/lib/models/socialLink";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const active = searchParams.get("active");

    let query = {};
    if (active === "true") {
      query.isActive = true;
    }

    const socialLinks = await SocialLink.find(query).sort({
      order: 1,
      createdAt: 1,
    });

    return NextResponse.json({
      success: true,
      data: socialLinks,
    });
  } catch (error) {
    console.error("Error fetching social links:", error);
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

    // Set order to be the highest + 1 if not provided
    if (!body.order) {
      const lastLink = await SocialLink.findOne().sort({ order: -1 });
      body.order = lastLink ? lastLink.order + 1 : 1;
    }

    const socialLink = await SocialLink.create(body);

    return NextResponse.json(
      {
        success: true,
        data: socialLink,
        message: "Social link created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating social link:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
