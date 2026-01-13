
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateRomanticLetter = async (name: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Tuliskan sebuah pesan singkat acak (random) untuk pacar saya namanya ${name}.
      Konteks: Hubungan LDR / Virtual.
      Pilih salah satu vibe secara acak: kangen berat, gombal receh, lucu/mengejek jarak, atau curhat pengen ketemu tapi santai.
      Gaya Bahasa: Bahasa chat Indonesia yang natural (pake 'aku-kamu' atau gaya santai), jangan puitis alay, jangan kaku kayak AI.
      Hindari kata-kata pujangga lama. Harus terasa seperti chat yang dikirim tiba-tiba. Maksimal 1-2 kalimat pendek.`,
      config: {
        temperature: 1.0, // Higher temperature for more randomness
        topP: 0.95,
      }
    });

    return response.text?.trim() || "Kangen kamu, itu aja. Nggak usah nanya kenapa.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sinyal kangennya lagi loading, tapi intinya aku sayang kamu.";
  }
};
