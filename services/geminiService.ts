import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData, Experience } from '../types';

const API_KEY = process.env.API_KEY;

export const isApiConfigured = !!API_KEY;

// Lazily initialize the AI client to prevent crashing on load if the key is missing.
let ai: GoogleGenAI | null = null;
if (isApiConfigured) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
}

const model = 'gemini-2.5-flash';

const formatResumeDataForPrompt = (data: ResumeData): string => {
    return `
      - Name: ${data.personalInfo.name}
      - Experience:
        ${data.experience.map(exp => `
          - Role: ${exp.role} at ${exp.company}
          - Responsibilities: ${exp.bulletPoints.join(', ')}
        `).join('')}
      - Education:
        ${data.education.map(edu => `
          - Degree: ${edu.degree} from ${edu.institution}
        `).join('')}
      - Skills: ${data.skills.join(', ')}
    `;
};

export const generateResumeSummary = async (
    resumeData: ResumeData,
    jobDescription: string
): Promise<string> => {
    if (!ai) {
        throw new Error("Gemini API key is not configured. Please set the API_KEY environment variable in your deployment settings.");
    }

    const prompt = `
        Act as a professional resume writer and career coach.
        Based on the following resume details and the target job description, write a compelling and concise professional summary of 2-4 sentences.
        The summary should be impactful, tailored to the job, and highlight the candidate's key strengths and qualifications.

        Resume Details:
        ${formatResumeDataForPrompt(resumeData)}

        Target Job Description:
        ---
        ${jobDescription}
        ---

        Generate the professional summary only. Do not add any introductory phrases like "Here is the summary:".
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });
        if (response.text) {
            return response.text.trim();
        }
        return '';
    } catch (error) {
        console.error("Error calling Gemini API for summary:", error);
        throw new Error("Failed to generate summary from AI.");
    }
};

export const generateExperiencePoints = async (
    experience: Experience,
    jobDescription: string
): Promise<string[]> => {
    if (!ai) {
        throw new Error("Gemini API key is not configured. Please set the API_KEY environment variable in your deployment settings.");
    }

    const prompt = `
        Act as a professional resume writer. Your task is to rewrite and enhance the bullet points for a specific job experience to align them perfectly with a target job description.
        Use the STAR (Situation, Task, Action, Result) method where possible to create impactful, achievement-oriented bullet points.
        Focus on quantifying achievements and using strong action verbs.

        Current Experience Details:
        - Role: ${experience.role}
        - Company: ${experience.company}
        - Existing Bullet Points: ${experience.bulletPoints.map(bp => `\n  - ${bp}`).join('')}

        Target Job Description:
        ---
        ${jobDescription}
        ---

        Based on the above, generate a list of 3-5 enhanced bullet points.
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING,
                        description: 'An enhanced bullet point for the resume.'
                    }
                }
            }
        });
        
        if (response.text) {
            const jsonString = response.text.trim();
            const points = JSON.parse(jsonString);
            return Array.isArray(points) ? points : [];
        }
        return [];
    } catch (error) {
        console.error("Error calling Gemini API for experience:", error);
        throw new Error("Failed to generate experience points from AI.");
    }
};