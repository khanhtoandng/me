import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Recommendation from "@/lib/models/recommendation"

export async function GET(request, { params }) {
  try {
    await dbConnect()
    const { id } = await params;
    const recommendation = await Recommendation.findById(id)

    if (!recommendation) {
      return NextResponse.json({ success: false, error: "Recommendation not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: recommendation })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect()
    const { id } = await params;

    const body = await request.json()
    body.updatedAt = Date.now()

    const recommendation = await Recommendation.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!recommendation) {
      return NextResponse.json({ success: false, error: "Recommendation not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: recommendation })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect()
    const { id } = await params;

    const recommendation = await Recommendation.findByIdAndDelete(id)

    if (!recommendation) {
      return NextResponse.json({ success: false, error: "Recommendation not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
