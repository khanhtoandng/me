/**
 * Test script for Gemini AI integration
 * Run with: node scripts/test-gemini.js
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Gemini API configuration
const GEMINI_API_KEY = "AIzaSyCU6wEazb7dvTZnVV9BtaFk39sg52d4-IQ";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function testGeminiAPI() {
  console.log("Testing Gemini AI API integration...");

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Test text enhancement
    const testText =
      "I am a developer who builds web applications using React and Node.js.";

    const prompt = `You are a professional copywriter specializing in personal branding. Please enhance the following text for a software developer's portfolio website. Make it more engaging, professional, and compelling while maintaining the original meaning:

Original text: "${testText}"

Please provide only the enhanced text without any explanations or additional formatting.`;

    console.log("\n📝 Original text:");
    console.log(testText);

    console.log("\n🤖 Sending request to Gemini AI...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhancedText = response.text().trim();

    console.log("\n✨ Enhanced text:");
    console.log(enhancedText);

    console.log("\n✅ Gemini AI integration test successful!");

    // Test suggestions generation
    console.log("\n🔍 Testing suggestions generation...");
    const suggestionPrompt = `You are a professional content strategist. Analyze the following content and provide 3-5 specific, actionable suggestions for improvement:

Content: "${testText}"

Please provide suggestions as a numbered list, each suggestion should be concise and actionable.`;

    const suggestionResult = await model.generateContent(suggestionPrompt);
    const suggestionResponse = await suggestionResult.response;
    const suggestions = suggestionResponse.text().trim();

    console.log("\n💡 Suggestions:");
    console.log(suggestions);

    console.log("\n🎉 All Gemini AI tests passed!");
  } catch (error) {
    console.error("❌ Gemini AI test failed:", error.message);

    if (error.message.includes("API key")) {
      console.log("💡 Check your API key configuration");
    } else if (
      error.message.includes("quota") ||
      error.message.includes("limit")
    ) {
      console.log("💡 API quota exceeded, try again later");
    } else {
      console.log("💡 Check your internet connection and API status");
    }
  }
}

// Run the test
testGeminiAPI();
