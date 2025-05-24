import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini API configuration
const GEMINI_API_KEY = "AIzaSyCU6wEazb7dvTZnVV9BtaFk39sg52d4-IQ";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * Enhance text using Google Gemini AI
 * @param {string} text - The original text to enhance
 * @param {string} type - The type of content (hero, footer, project, experience)
 * @param {string} context - Additional context for enhancement
 * @returns {Promise<string>} - Enhanced text
 */
export async function enhanceText(text, type = "general", context = "") {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt = "";

    switch (type) {
      case "hero":
        prompt = `You are a professional copywriter specializing in personal branding. Please enhance the following hero section text for a software developer's portfolio website. Make it more engaging, professional, and compelling while maintaining the original meaning and personal touch. Keep the same structure but improve the language, flow, and impact:

Original text: "${text}"

${context ? `Additional context: ${context}` : ""}

Please provide only the enhanced text without any explanations or additional formatting.`;
        break;

      case "footer":
        prompt = `You are a professional copywriter. Please enhance the following footer description for a software developer's portfolio website. Make it concise, professional, and impactful while maintaining the original meaning:

Original text: "${text}"

${context ? `Additional context: ${context}` : ""}

Please provide only the enhanced text without any explanations or additional formatting.`;
        break;

      case "project":
        prompt = `You are a technical writer specializing in software project descriptions. Please enhance the following project description to make it more compelling and professional. Focus on highlighting technical achievements, impact, and value delivered:

Original text: "${text}"

${context ? `Additional context: ${context}` : ""}

Please provide only the enhanced text without any explanations or additional formatting.`;
        break;

      case "experience":
        prompt = `You are a professional resume writer. Please enhance the following work experience description to make it more impactful and achievement-focused. Use action verbs and quantify results where possible:

Original text: "${text}"

${context ? `Additional context: ${context}` : ""}

Please provide only the enhanced text without any explanations or additional formatting.`;
        break;

      default:
        prompt = `Please enhance the following text to make it more professional, engaging, and well-written while maintaining the original meaning:

Original text: "${text}"

${context ? `Additional context: ${context}` : ""}

Please provide only the enhanced text without any explanations or additional formatting.`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhancedText = response.text().trim();

    return enhancedText;
  } catch (error) {
    console.error("Error enhancing text with Gemini:", error);
    throw new Error("Failed to enhance text. Please try again.");
  }
}

/**
 * Generate suggestions for improving content
 * @param {string} text - The text to analyze
 * @param {string} type - The type of content
 * @returns {Promise<string[]>} - Array of suggestions
 */
export async function generateSuggestions(text, type = "general") {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a professional content strategist. Analyze the following ${type} content and provide 3-5 specific, actionable suggestions for improvement. Focus on clarity, impact, and professional presentation:

Content: "${text}"

Please provide suggestions as a numbered list, each suggestion should be concise and actionable.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestions = response.text().trim();

    // Parse suggestions into array
    const suggestionLines = suggestions
      .split("\n")
      .filter((line) => line.trim().length > 0);
    return suggestionLines;
  } catch (error) {
    console.error("Error generating suggestions with Gemini:", error);
    throw new Error("Failed to generate suggestions. Please try again.");
  }
}

/**
 * Generate multiple variations of text
 * @param {string} text - The original text
 * @param {string} type - The type of content
 * @param {number} count - Number of variations to generate
 * @returns {Promise<string[]>} - Array of text variations
 */
export async function generateVariations(text, type = "general", count = 3) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a professional copywriter. Please create ${count} different variations of the following ${type} content. Each variation should have a different tone and approach while maintaining the core message:

Original text: "${text}"

Please provide ${count} distinct variations, each on a new line, numbered 1, 2, 3, etc.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const variations = response.text().trim();

    // Parse variations into array
    const variationLines = variations
      .split("\n")
      .filter((line) => line.trim().length > 0);
    return variationLines.map((line) => line.replace(/^\d+\.\s*/, "").trim());
  } catch (error) {
    console.error("Error generating variations with Gemini:", error);
    throw new Error("Failed to generate variations. Please try again.");
  }
}
