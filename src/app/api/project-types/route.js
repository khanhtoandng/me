import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ProjectType from "@/lib/models/projectType";

// GET - Fetch all project types
export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const active = searchParams.get("active");

    let query = {};
    if (active === "true") {
      query.isActive = true;
    }

    const projectTypes = await ProjectType.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: projectTypes,
      count: projectTypes.length,
    });
  } catch (error) {
    console.error("Error fetching project types:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch project types" },
      { status: 500 }
    );
  }
}

// POST - Create new project type
export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, description, icon, color, isActive } = body;

    // Validation
    if (!name || !icon || !icon.library || !icon.name) {
      return NextResponse.json(
        { success: false, error: "Name and icon are required" },
        { status: 400 }
      );
    }

    // Check if project type with same name already exists
    const existingType = await ProjectType.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') } 
    });

    if (existingType) {
      return NextResponse.json(
        { success: false, error: "Project type with this name already exists" },
        { status: 400 }
      );
    }

    const projectType = await ProjectType.create({
      name: name.trim(),
      description: description?.trim() || "",
      icon,
      color: color || "#3B82F6",
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json({
      success: true,
      data: projectType,
      message: "Project type created successfully",
    });
  } catch (error) {
    console.error("Error creating project type:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Project type with this name already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to create project type" },
      { status: 500 }
    );
  }
}
