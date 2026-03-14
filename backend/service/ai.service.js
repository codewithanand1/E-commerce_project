import genAI from "../config/gemini.js";

export const askAI = async (message) => {

  const model=genAI.getGenerativeModel({
    model:"gemini-1.5-flash"
  });

  const result = await model.generateContent(message);

  const response = result.response.text();

  return response;
};