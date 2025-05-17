import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Message from "@/lib/models/message"

export async function GET(request, { params }) {
  try {
    await dbConnect()
    const message = await Message.findById(params.id)

    if (!message) {
      return NextResponse.json({ success: false, error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: message })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect()

    const body = await request.json()

    const message = await Message.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })

    if (!message) {
      return NextResponse.json({ success: false, error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: message })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect()

    const message = await Message.findByIdAndDelete(params.id)

    if (!message) {
      return NextResponse.json({ success: false, error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
