import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const optimizeResume = async (resume: ResumeData, jobDescription: string) => {
  const prompt = `
    You are an expert career coach and resume optimizer.
    Analyze the following resume data and optimize it for the provided job description.
    
    Resume: ${JSON.stringify(resume)}
    Job Description: ${jobDescription}
    
    Provide:
    1. A list of specific improvements for the summary and experience descriptions.
    2. Keywords that are missing but relevant to the job.
    3. A score from 0-100 on how well the resume matches the job.
    4. Suggestions for skills to highlight.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          improvements: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          missingKeywords: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          matchScore: { type: Type.NUMBER },
          highlightSkills: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["improvements", "missingKeywords", "matchScore", "highlightSkills"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateInterviewQuestions = async (resume: ResumeData, jobDescription: string) => {
  const prompt = `
    Based on the following resume and job description, generate 5 challenging interview questions.
    For each question, explain why it's being asked and what a "good" answer should include.
    
    Resume: ${JSON.stringify(resume)}
    Job Description: ${jobDescription}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            reason: { type: Type.STRING },
            idealAnswer: { type: Type.STRING }
          },
          required: ["question", "reason", "idealAnswer"]
        }
      }
    }
  });

  return JSON.parse(response.text);
};

export const startMockInterview = async (resume: ResumeData, jobDescription: string, history: { role: string, content: string }[]) => {
  const systemInstruction = `
    You are an expert interviewer for a position matching the provided job description.
    You have the candidate's resume.
    Conduct a realistic, professional, and challenging mock interview.
    Ask one question at a time.
    Provide brief feedback after each answer if appropriate, then move to the next question.
    
    Candidate Resume: ${JSON.stringify(resume)}
    Job Description: ${jobDescription}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: history.map(h => h.content).join("\n"), // Simplified for now, better to use chat history format
    config: {
      systemInstruction
    }
  });

  return response.text;
};
