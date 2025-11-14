
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchToolDescription = async (toolName: string): Promise<string> => {
  try {
    const prompt = `Provide a concise, one-sentence description for the AI tool named '${toolName}'. The description should explain its primary function or use case. Focus on what it does for the user.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error(`Error fetching description for ${toolName}:`, error);
    return "Could not generate a description at this time.";
  }
};
