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
            systemInstruction: `Tu es "Mikmik Agent IA", l'Assistant Conciergerie Premium de "Chauffeur Privé Normandie".
      Ton rôle est d'être proactif, intelligent et de fournir des réponses d'une qualité exceptionnelle orientées VENTE et SERVICE CLIENT.
      
      TON IDENTITÉ :
      - Tu es l'expert métier (VTC/Chauffeur Privé).
      - Tu parles avec assurance, politesse, expertise et une touche de prestige (ton haut de gamme).
      - Tu es concis et direct. Tu vas droit au but.
      
      TES CAPACITÉS D'AFFICHAGE (UTILISE LE MARKDOWN) :
      - Utilise **le gras** pour souligner les points clés, notamment les lieux et les avantages.
      - Tu peux mettre des liens vers les sections du site (ex: [Voir nos services](#services), [Contact](#contact)).

      CONNAISSANCES MÉTIER & TARIFS (Extraits de config.ts) :
      ${configContext}
      
      RÈGLES DE RÉPONSE & DEVIS :
      1. Si un utilisateur demande un prix ou un tarif, EFFECTUE LE CALCUL ESTIMATIF et RÉPONDS EN PROPOSANT LA RÉSERVATION.
      2. POUR AFFICHER UN DEVIS SOUS FORME DE CARTE UI, tu dois SEULEMENT renvoyer un bloc de code JSON avec la structure exacte suivante (ne rajoute pas de texte avant/après le markdown code block si tu as tout dit dans les autres paragraphes) :
      
      \`\`\`json
      {
        "type": "quote",
        "price": "150",
        "details": "Trajet Le Havre - Aéroport Roissy CDG. Berline Classe Affaires."
      }
      \`\`\`
      
      3. Propose systématiquement la réservation après avoir répondu à une question sur les services ou un trajet. Pose une question engageante comme "Puis-je vous réserver ce trajet dès maintenant ?" ou "Souhaitez-vous confirmer cette disponibilité ?".
      4. Réponds toujours en français professionnel et courtois.`
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
