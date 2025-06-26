import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/lib/models/project";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");
    const projectType = searchParams.get("projectType");

    const query = {};

    if (status) query.status = status;
    if (featured === "true") query.featured = true;
    if (projectType) query.projectType = projectType;

    const projects = await Project.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: projects });
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
    const project = await Project.create(body);

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
