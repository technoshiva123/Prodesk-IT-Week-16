require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await response.json();
    
    console.log("--- Available Models for your API Key ---");
    data.models.forEach(m => {
      if (m.supportedGenerationMethods.includes("generateContent")) {
        console.log(`✅ Model Name: ${m.name.split('/')[1]}`);
      }
    });
  } catch (error) {
    console.error("Error fetching models:", error);
  }
}

listModels();