import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Read the AI Handbook for context
        const handbookPath = path.join(process.cwd(), "INSTRUCTIONS_AI.md");
        let handbookContext = "";
        try {
            handbookContext = await fs.readFile(handbookPath, "utf-8");
        } catch (e) {
            console.error("Could not read INSTRUCTIONS_AI.md", e);
            handbookContext = "No specific architecture instructions found.";
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `Tu es l'assistant expert du dépôt "Chauffeur Privé". 
      Ton rôle est d'aider les développeurs et les IA à comprendre et étendre ce projet.
      RESTE STRICTEMENT DANS LE CADRE DE L'ARCHITECTURE DÉCRITE CI-DESSOUS.
      
      CONTEXTE ARCHITECTURAL (INSTRUCTIONS_AI.md):
      ${handbookContext}
      
      Règles de réponse :
      1. Sois technique mais concis.
      2. Si on te demande d'ajouter une feature, explique les étapes (Domain -> Service -> UI).
      3. Ne propose jamais de casser la Service Layer.
      4. Réponds en français.`
        });

        const chat = model.startChat({
            history: messages.slice(0, -1).map((m: any) => ({
                role: m.role === "user" ? "user" : "model",
                parts: [{ text: m.content }],
            })),
        });

        const lastMessage = messages[messages.length - 1].content;
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;

        return NextResponse.json({ content: response.text() });
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
    }
}
