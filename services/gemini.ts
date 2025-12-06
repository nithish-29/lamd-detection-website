import { GoogleGenAI, Modality } from "@google/genai";
import { Mine } from "../types";
import { playPCMAudio } from "../utils/audio";

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a textual threat assessment based on the list of detected mines.
 */
export const getThreatAssessment = async (mines: Mine[]): Promise<string> => {
  try {
    const formattedMines = mines.map((mine, index) => 
        `#${index + 1}: Type: ${mine.type}, Confidence: ${(mine.confidence * 100).toFixed(1)}%, Loc: ${mine.lat.toFixed(4)}, ${mine.lon.toFixed(4)}`
    ).join('\n');

    const prompt = `Analyze the following UAV detection report for landmines and UXO in a conflict zone.
    
    Total Hazards: ${mines.length}
    ${formattedMines}
    
    Provide a concise, authoritative military intelligence summary (SITREP style). 
    Identify the primary threat level, the dominant ordnance type, and one critical priority action for the EOD team. 
    Keep it under 100 words. Do not use markdown headers.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert military intelligence analyst. Be concise, direct, and actionable.",
        temperature: 0.4,
      }
    });

    return response.text || "No assessment generated.";
  } catch (error: any) {
    console.error("Threat Assessment Error:", error);
    throw new Error(`AI Analysis Failed: ${error.message}`);
  }
};

/**
 * Generates and plays an audio EOD protocol for a specific mine type.
 */
export const playEODProtocol = async (mineType: string): Promise<string> => {
  try {
    const prompt = `Generate a high-priority, urgent EOD safety warning for a detected ${mineType}.
    Protocol: Stop movement immediately. Mark and record the threat location precisely. Do not approach the device. Await specialized EOD team arrival.
    
    Speak this protocol clearly and urgently. Do not add introductory fluff. Just the commands.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Kore, Puck, Charon, Fenrir, Zephyr
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      throw new Error("No audio data received from Gemini.");
    }

    // Play the audio
    await playPCMAudio(base64Audio);

    return `Protocol broadcasted for ${mineType}.`;
  } catch (error: any) {
    console.error("EOD Protocol Audio Error:", error);
    throw new Error(`Audio Protocol Failed: ${error.message}`);
  }
};