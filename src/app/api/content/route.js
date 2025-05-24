import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Content from "@/lib/models/content";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");

    let query = { isActive: true };
    if (section) {
      query.section = section;
    }

    const content = await Content.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    
    // Check if content for this section already exists
    const existingContent = await Content.findOne({ section: body.section });
    
    if (existingContent) {
      // Update existing content
      const updatedContent = await Content.findOneAndUpdate(
        { section: body.section },
        body,
        { new: true, runValidators: true }
      );
      
      return NextResponse.json(
        { 
          success: true, 
          data: updatedContent,
          message: "Content updated successfully"
        },
        { status: 200 }
      );
    } else {
      // Create new content
      const content = await Content.create(body);
      
      return NextResponse.json(
        { 
          success: true, 
          data: content,
          message: "Content created successfully"
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error saving content:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
