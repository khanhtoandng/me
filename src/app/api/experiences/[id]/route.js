import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Experience from "@/lib/models/experience"

export async function GET(request, { params }) {
  try {
    await dbConnect()
    const experience = await Experience.findById(params.id)

    if (!experience) {
      return NextResponse.json({ success: false, error: "Experience not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: experience })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect()

    const body = await request.json()
    body.updatedAt = Date.now()

    const experience = await Experience.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })

    if (!experience) {
      return NextResponse.json({ success: false, error: "Experience not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: experience })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect()

    const experience = await Experience.findByIdAndDelete(params.id)

    if (!experience) {
      return NextResponse.json({ success: false, error: "Experience not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
