import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ProjectType from "@/lib/models/projectType";
import mongoose from "mongoose";

// GET - Fetch single project type
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid project type ID" },
        { status: 400 },
      );
    }

    const projectType = await ProjectType.findById(id);

    if (!projectType) {
      return NextResponse.json(
        { success: false, error: "Project type not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: projectType,
    });
  } catch (error) {
    console.error("Error fetching project type:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch project type" },
      { status: 500 },
    );
  }
}

// PUT - Update project type
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid project type ID" },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { name, description, icon, color, isActive } = body;

    // Validation
    if (!name || !icon || !icon.library || !icon.name) {
      return NextResponse.json(
        { success: false, error: "Name and icon are required" },
        { status: 400 },
      );
    }

    // Check if another project type with same name exists
    const existingType = await ProjectType.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
      _id: { $ne: id },
    });

    if (existingType) {
      return NextResponse.json(
        { success: false, error: "Project type with this name already exists" },
        { status: 400 },
      );
    }

    const projectType = await ProjectType.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        description: description?.trim() || "",
        icon,
        color: color || "#3B82F6",
        isActive: isActive !== undefined ? isActive : true,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true },
    );

    if (!projectType) {
      return NextResponse.json(
        { success: false, error: "Project type not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: projectType,
      message: "Project type updated successfully",
    });
  } catch (error) {
    console.error("Error updating project type:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update project type" },
      { status: 500 },
    );
  }
}

// DELETE - Delete project type
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid project type ID" },
        { status: 400 },
      );
    }

    const projectType = await ProjectType.findByIdAndDelete(id);

    if (!projectType) {
      return NextResponse.json(
        { success: false, error: "Project type not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project type deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project type:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete project type" },
      { status: 500 },
    );
  }
}
