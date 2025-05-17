import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Message from "@/lib/models/message"

export async function GET(request) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const read = searchParams.get("read")
    const starred = searchParams.get("starred")
    const archived = searchParams.get("archived")

    const query = {}

    if (read === "true") query.read = true
    if (read === "false") query.read = false
    if (starred === "true") query.starred = true
    if (archived === "true") query.archived = true
    if (archived === "false") query.archived = false

    const messages = await Message.find(query).sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: messages })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

export async function POST(request) {
  try {
    await dbConnect()
    const body = await request.json()
    const message = await Message.create(body)
    return NextResponse.json({ success: true, data: message }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
