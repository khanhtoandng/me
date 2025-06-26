import { NextRequest, NextResponse } from "next/server";
import {
  uploadToCloudinary,
  uploadProfilePhoto,
  uploadProjectImage,
  uploadDocument,
} from "@/lib/cloudinary";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const uploadType = formData.get("type") || "general"; // profile, project, document, general
    const entityId = formData.get("entityId") || "default"; // user ID, project ID, etc.

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/webm",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "File type not allowed" },
        { status: 400 },
      );
    }

    // Validate file size (10MB limit for Cloudinary)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: "File size too large (max 10MB)" },
        { status: 400 },
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let uploadResult;

    // Choose upload method based on type
    switch (uploadType) {
      case "profile":
        uploadResult = await uploadProfilePhoto(buffer, entityId, file.type);
        break;
      case "project":
        uploadResult = await uploadProjectImage(buffer, entityId, file.type);
        break;
      case "document":
        uploadResult = await uploadDocument(buffer, file.name, file.type);
        break;
      default:
        // General upload
        uploadResult = await uploadToCloudinary(buffer, {
          folder: "alshaer-portfolio/general",
          mimeType: file.type,
        });
    }

    if (!uploadResult.success) {
      return NextResponse.json(
        { success: false, error: uploadResult.error },
        { status: 500 },
      );
    }

    // Return the Cloudinary URL and metadata
    return NextResponse.json({
      success: true,
      url: uploadResult.url,
      publicId: uploadResult.publicId,
      filename: file.name,
      size: file.size,
      type: file.type,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
      bytes: uploadResult.bytes,
      resourceType: uploadResult.resourceType,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 },
    );
  }
}
