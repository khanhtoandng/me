import {
  enhanceText,
  generateSuggestions,
  generateVariations,
} from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { text, type, context, action = "enhance" } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Text is required" },
        { status: 400 },
      );
    }

    let result;

    switch (action) {
      case "enhance":
        result = await enhanceText(text, type, context);
        return NextResponse.json({
          success: true,
          data: { enhancedText: result },
          message: "Text enhanced successfully",
        });

      case "suggestions":
        result = await generateSuggestions(text, type);
        return NextResponse.json({
          success: true,
          data: { suggestions: result },
          message: "Suggestions generated successfully",
        });

      case "variations":
        const count = 3; // Generate 3 variations
        result = await generateVariations(text, type, count);
        return NextResponse.json({
          success: true,
          data: { variations: result },
          message: "Variations generated successfully",
        });

      default:
        return NextResponse.json(
          {
            success: false,
            error:
              "Invalid action. Use 'enhance', 'suggestions', or 'variations'",
          },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("AI enhancement error:", error);

    // Handle specific Gemini API errors
    if (error.message.includes("API key")) {
      return NextResponse.json(
        { success: false, error: "AI service configuration error" },
        { status: 500 },
      );
    }

    if (error.message.includes("quota") || error.message.includes("limit")) {
      return NextResponse.json(
        {
          success: false,
          error: "AI service quota exceeded. Please try again later.",
        },
        { status: 429 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process text with AI",
      },
      { status: 500 },
    );
  }
}
