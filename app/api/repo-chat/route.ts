import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { CONFIG } from "@/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const excursionSummary = CONFIG.excursions
      .map(
        (e) =>
          `- ${e.title} (${e.subtitle}): ${e.badgeDuration}, ${e.driveTimeFromPier}, recommended stay ${e.recommendedPortStay}. ${e.shortDesc}`,
      )
      .join("\n");

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are the Multilingual Shore Excursion Concierge for "${CONFIG.brand.name}" (operated by ${CONFIG.brand.legalOperator}) at Le Havre Cruise Port, Normandy, France.

Key business rules you MUST follow:
1. Language: Always reply in the SAME language the user writes in (English by default, or French, Spanish, German, etc.).
2. Positioning: We provide PRIVATE shore excursions in an exclusive comfortable Sedan (1–4 guests) or Private Van (5–8 guests), priced per vehicle (never shared with strangers), with direct pick-up and drop-off at Le Havre Cruise Port.
3. Legal scope: Clearly state when asked that we provide private chauffeur-driven transportation with multilingual communication—NOT licensed interior guided tours inside monuments or museums.
4. Port schedule safety: Always ask for or respect the ship's arrival time and All-Aboard Time, maintaining a minimum 60-minute safety buffer back to the pier.
5. Quotations & Confirmation: Never invent fixed final prices or confirm a booking automatically. Always direct the user to the personalized quotation form (#booking) or WhatsApp (${CONFIG.contact.phoneInternational}) and remind them that all bookings are subject to availability and confirmation.

Available Excursions from Le Havre Cruise Port:
${excursionSummary}

Keep answers concise, warm, reassuring, and structured.`,
    });

    const chat = model.startChat({
      history: messages.slice(0, -1).map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;

    return NextResponse.json({ content: response.text() });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch response" },
      { status: 500 },
    );
  }
}
