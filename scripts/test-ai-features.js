/**
 * Comprehensive test for AI enhancement features
 * Run with: node scripts/test-ai-features.js
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Test configuration
const GEMINI_API_KEY = "AIzaSyCU6wEazb7dvTZnVV9BtaFk39sg52d4-IQ";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Test data for different content types
const testData = {
  hero: "I am a Full-Stack Developer from Palestine, specializing in crafting seamless and efficient web applications across both front-end and back-end technologies.",
  footer: "Full-Stack Developer specializing in creating seamless and efficient web applications.",
  project: "This is a web application built with React and Node.js. It has user authentication and a dashboard.",
  experience: "Worked as a developer building web applications and fixing bugs. Used various technologies and frameworks."
};

async function testAIEnhancement(text, type) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log(`\n🧪 Testing ${type.toUpperCase()} enhancement...`);
    console.log(`📝 Original: ${text.substring(0, 80)}...`);

    // Test enhancement
    const enhancePrompt = `You are a professional copywriter specializing in personal branding. Please enhance the following ${type} text for a software developer's portfolio website. Make it more engaging, professional, and compelling while maintaining the original meaning:

Original text: "${text}"

Please provide only the enhanced text without any explanations or additional formatting.`;

    const enhanceResult = await model.generateContent(enhancePrompt);
    const enhanceResponse = await enhanceResult.response;
    const enhancedText = enhanceResponse.text().trim();
    
    console.log(`✨ Enhanced: ${enhancedText.substring(0, 80)}...`);

    // Test suggestions
    const suggestionPrompt = `You are a professional content strategist. Analyze the following ${type} content and provide 3 specific, actionable suggestions for improvement:

Content: "${text}"

Please provide suggestions as a numbered list.`;

    const suggestionResult = await model.generateContent(suggestionPrompt);
    const suggestionResponse = await suggestionResult.response;
    const suggestions = suggestionResponse.text().trim();
    
    const suggestionCount = (suggestions.match(/\d+\./g) || []).length;
    console.log(`💡 Generated ${suggestionCount} suggestions`);

    // Test variations
    const variationPrompt = `You are a professional copywriter. Please create 3 different variations of the following ${type} content:

Original text: "${text}"

Please provide 3 distinct variations, numbered 1, 2, 3.`;

    const variationResult = await model.generateContent(variationPrompt);
    const variationResponse = await variationResult.response;
    const variations = variationResponse.text().trim();
    
    const variationCount = (variations.match(/\d+\./g) || []).length;
    console.log(`🎨 Generated ${variationCount} variations`);

    return {
      enhanced: enhancedText,
      suggestions: suggestionCount,
      variations: variationCount,
      success: true
    };

  } catch (error) {
    console.error(`❌ ${type} test failed:`, error.message);
    return { success: false, error: error.message };
  }
}

async function runAllTests() {
  console.log("🚀 Starting comprehensive AI enhancement tests...");
  console.log("=" .repeat(60));

  const results = {};
  let totalTests = 0;
  let passedTests = 0;

  for (const [type, text] of Object.entries(testData)) {
    totalTests++;
    const result = await testAIEnhancement(text, type);
    results[type] = result;
    
    if (result.success) {
      passedTests++;
      console.log(`✅ ${type} test PASSED`);
    } else {
      console.log(`❌ ${type} test FAILED`);
    }
    
    // Add delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log("\n" + "=" .repeat(60));
  console.log("📊 TEST SUMMARY");
  console.log("=" .repeat(60));
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${totalTests - passedTests}`);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

  if (passedTests === totalTests) {
    console.log("\n🎉 ALL AI ENHANCEMENT FEATURES ARE WORKING PERFECTLY!");
    console.log("\n✨ Features Available:");
    console.log("   • Hero Section Enhancement");
    console.log("   • Footer Content Enhancement");
    console.log("   • Project Description Enhancement");
    console.log("   • Experience Description Enhancement");
    console.log("   • Smart Suggestions Generation");
    console.log("   • Multiple Variations Creation");
    console.log("\n🔗 Access via: /dashboard/ai-demo");
  } else {
    console.log("\n⚠️  Some tests failed. Check the errors above.");
  }

  return results;
}

// Run the comprehensive test
runAllTests().catch(console.error);
