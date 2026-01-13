
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateRomanticLetter = async (mood: string, name: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Buatkan pesan cinta singkat untuk pacar saya namanya ${name}.
      Konteks: Kita sedang menjalani hubungan virtual/LDR.
      Mood pesan: ${mood}.
      Gaya Bahasa: Gunakan bahasa Indonesia santai (bahasa chat anak muda), jujur, romantis tapi ada bumbu lucunya biar nggak terlalu kaku atau "alay". 
      Jangan pakai kata "wahai", "pujaan hati", atau "dinda".
      Fokus ke perasaan kangen karena jauh, tapi tetap bikin dia ketawa atau senyum. Maksimal 2-3 kalimat saja biar kayak chat beneran.`,
      config: {
        temperature: 0.9,
        topP: 0.95,
      }
    });

    return response.text || "Aku sebenernya mau ngetik panjang, tapi intinya aku kangen kamu sampe mau meledak. Dah itu aja.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Duh, server cintanya lagi down gara-gara kangen kamu. Nanti coba lagi ya!";
  }
};
