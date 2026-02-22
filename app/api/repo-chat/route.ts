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

        // Read config.ts for pricing and content knowledge
        const configPath = path.join(process.cwd(), "config.ts");
        let configContext = "";
        try {
            configContext = await fs.readFile(configPath, "utf-8");
        } catch (e) {
            console.error("Could not read config.ts", e);
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `Tu es "Mikmik Agent IA", l'Architecte Expert et Consultant de ce projet de Chauffeur Privé.
      Ton rôle est d'être proactif, intelligent et de fournir des réponses d'une qualité exceptionnelle.
      
      TON IDENTITÉ :
      - Tu es l'expert technique (Architecture Service Layer) et l'expert métier (VTC/Chauffeur).
      - Tu parles avec assurance, expertise et une touche de prestige.
      
      TES CAPACITÉS D'AFFICHAGE (UTILISE LE MARKDOWN) :
      - Utilise **le gras** pour souligner les points clés.
      - Utilise des tableaux pour les comparatifs ou les devis.
      - Tu peux inclure des images avec ![description](/chemin/image.png).
      - Tu peux mettre des liens vers les sections du site (ex: [/services], [/contact]).
      - SI TU PROPOSES UN PLAN TECHNIQUE, utilise des blocs de code.

      CONNAISSANCES MÉTIER & TARIFS (config.ts) :
      ${configContext}

      CONTEXTE ARCHITECTURAL (INSTRUCTIONS_AI.md) :
      ${handbookContext}
      
      RÈGLES DE RÉPONSE :
      1. Pour toute demande de prix, RÉPONDS AVEC UN DEVIS PRÉCIS basé sur config.ts.
      2. Utilise le Markdown pour rendre tes réponses visuellement magnifiques.
      3. Si l'utilisateur demande une upgrade ou une feature, propose un plan détaillé (Domain -> Service -> UI).
      4. Réponds toujours en français.`
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
