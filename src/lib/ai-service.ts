import { AI_CONFIG } from "./constants";

// ============================================================================
// AI Service for Text Enhancement
// ============================================================================

interface AIEnhancementOptions {
  type: "description" | "location" | "skills" | "technologies" | "general";
  context?: string;
  maxLength?: number;
}

interface AIResponse {
  success: boolean;
  data?: string | string[];
  error?: string;
}

/**
 * Enhanced text using Google Gemini AI
 */
export async function enhanceTextWithAI(
  text: string,
  options: AIEnhancementOptions
): Promise<AIResponse> {
  try {
    const prompt = generatePrompt(text, options);
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${AI_CONFIG.model}:generateContent?key=${AI_CONFIG.geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: AI_CONFIG.temperature,
            maxOutputTokens: AI_CONFIG.maxTokens,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const enhancedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!enhancedText) {
      throw new Error("No enhanced text received from AI");
    }

    // Process the response based on type
    const processedResult = processAIResponse(enhancedText, options.type);

    return {
      success: true,
      data: processedResult,
    };
  } catch (error) {
    console.error("AI Enhancement Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "AI enhancement failed",
    };
  }
}

/**
 * Generate appropriate prompt based on enhancement type
 */
function generatePrompt(text: string, options: AIEnhancementOptions): string {
  const { type, context, maxLength } = options;

  const baseInstructions = `Please enhance the following text. Return only the enhanced text without any additional commentary or formatting.`;
  const lengthLimit = maxLength ? ` Keep the response under ${maxLength} characters.` : "";

  switch (type) {
    case "description":
      return `${baseInstructions} Improve grammar, clarity, and professional tone. Remove unnecessary spaces and formatting issues. Make it concise and impactful.${lengthLimit}

Text to enhance: "${text}"`;

    case "location":
      return `${baseInstructions} Format this location in standard "City, State/Province, Country" format. If it's already well-formatted, return it as is. If information is missing, work with what's provided.

Location to format: "${text}"`;

    case "skills":
      return `${baseInstructions} Parse this raw text and extract individual skills. Return them as a comma-separated list. Remove duplicates, fix spelling, and use proper capitalization. Focus on technical skills, tools, and technologies.

Raw skills text: "${text}"`;

    case "technologies":
      return `${baseInstructions} Parse this raw text and extract individual technologies/tools. Return them as a comma-separated list. Remove duplicates, fix spelling, and use proper capitalization. Focus on programming languages, frameworks, libraries, and development tools.

Raw technologies text: "${text}"`;

    case "general":
    default:
      return `${baseInstructions} Improve grammar, clarity, and readability while maintaining the original meaning.${lengthLimit}

Text to enhance: "${text}"`;
  }
}

/**
 * Process AI response based on enhancement type
 */
function processAIResponse(response: string, type: string): string | string[] {
  const cleanedResponse = response.trim();

  if (type === "skills" || type === "technologies") {
    // Convert comma-separated string to array
    return cleanedResponse
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .slice(0, 20); // Limit to 20 items
  }

  return cleanedResponse;
}

/**
 * Enhance project description
 */
export async function enhanceProjectDescription(description: string): Promise<AIResponse> {
  return enhanceTextWithAI(description, {
    type: "description",
    context: "project",
    maxLength: 500,
  });
}

/**
 * Enhance experience description
 */
export async function enhanceExperienceDescription(description: string): Promise<AIResponse> {
  return enhanceTextWithAI(description, {
    type: "description",
    context: "work experience",
    maxLength: 400,
  });
}

/**
 * Format location with AI
 */
export async function enhanceLocation(location: string): Promise<AIResponse> {
  return enhanceTextWithAI(location, {
    type: "location",
  });
}

/**
 * Process skills with AI
 */
export async function processSkillsWithAI(rawSkills: string): Promise<AIResponse> {
  return enhanceTextWithAI(rawSkills, {
    type: "skills",
  });
}

/**
 * Process technologies with AI
 */
export async function processTechnologiesWithAI(rawTechnologies: string): Promise<AIResponse> {
  return enhanceTextWithAI(rawTechnologies, {
    type: "technologies",
  });
}

/**
 * Batch enhance multiple fields
 */
export async function batchEnhanceFields(
  fields: Array<{ text: string; type: AIEnhancementOptions["type"]; key: string }>
): Promise<Record<string, AIResponse>> {
  const results: Record<string, AIResponse> = {};

  // Process fields sequentially to avoid rate limiting
  for (const field of fields) {
    try {
      results[field.key] = await enhanceTextWithAI(field.text, { type: field.type });
      // Small delay between requests
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      results[field.key] = {
        success: false,
        error: error instanceof Error ? error.message : "Enhancement failed",
      };
    }
  }

  return results;
}

/**
 * Check if AI service is available
 */
export function isAIServiceAvailable(): boolean {
  return Boolean(AI_CONFIG.geminiApiKey);
}

/**
 * Validate text for AI enhancement
 */
export function validateTextForAI(text: string, minLength = 3, maxLength = 5000): {
  isValid: boolean;
  error?: string;
} {
  if (!text || text.trim().length === 0) {
    return { isValid: false, error: "Text cannot be empty" };
  }

  if (text.trim().length < minLength) {
    return { isValid: false, error: `Text must be at least ${minLength} characters long` };
  }

  if (text.length > maxLength) {
    return { isValid: false, error: `Text must be less than ${maxLength} characters long` };
  }

  return { isValid: true };
}
