import { Router, type IRouter } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router: IRouter = Router();

const fallbackParser = (query: string) => {
    const text = query.toLowerCase();
    let intentCategory = "all";

    if (text.includes("hotel") || text.includes("hoteis") || text.includes("hotéis")) intentCategory = "hotels";
    else if (text.includes("resort")) intentCategory = "resorts";
    else if (text.includes("praia")) intentCategory = "beaches";
    else if (text.includes("restaurante") || text.includes("comer") || text.includes("almoço")) intentCategory = "restaurants";
    else if (text.includes("carro") || text.includes("alugu")) intentCategory = "car-rental";
    else if (text.includes("voo") || text.includes("avião")) intentCategory = "flights";
    else if (text.includes("villa") || text.includes("casa")) intentCategory = "villas";
    else if (text.includes("hostel") || text.includes("mochileiro")) intentCategory = "hostels";

    let maxPrice = null;
    const priceMatch = text.match(/(\d+)\s*(euros|usd|mts|meticais|€|\$)/i);
    if (priceMatch) maxPrice = parseInt(priceMatch[1], 10);

    return {
        intentCategory,
        abstractText: text,
        location: null,
        maxPrice,
        minDays: null,
        crossCategoryDividerText: "Outras opções",
    };
};

router.post("/ai-search", async (req, res) => {
    const { query } = req.body;

    if (!query || typeof query !== "string") {
        res.status(400).json({ error: "query is required" });
        return;
    }

    const apiKey = process.env["GEMINI_API_KEY"];
    if (!apiKey) {
        res.json(fallbackParser(query));
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const sysPrompt = `
You are an expert AI Travel Assistant for the "GO TOUR" platform.
Your job is to parse the user's raw search query into a strict JSON object that the frontend will use to navigate and filter results.
You are extremely intelligent: you handle typos (e.g. "praiaa" -> beaches), local dialects, and complex constraints.

Categories available (MUST return exactly one of these strings for intentCategory):
'all', 'hotels', 'apartments', 'resorts', 'guesthouses', 'hostels', 'villas', 'lodges',
'restaurants', 'experiences', 'activities', 'events', 'culture', 'beaches',
'nightlife', 'transport', 'car-rental', 'flights', 'shopping'

Rules:
1. Determine the best matching "intentCategory". E.g., "hotel barato" -> "hotels", "onde nadar no mar" -> "beaches". If vague or broad, use "all".
2. Create an "abstractText": A very short, premium title of what they want.
3. Extract "maxPrice" numerically if they mention a budget. Otherwise null.
4. Extract "minDays" numerically if they mention duration. Otherwise null.
5. Extract "location" if they mention a city/region. Otherwise null.
6. Create a "crossCategoryDividerText": A brilliant, context-aware short phrase that separates the exact results from the rest of the generic platform categories.

Respond ONLY with valid JSON. Do not include markdown formatting or backticks. The JSON should match exactly:
{
  "intentCategory": "string",
  "abstractText": "string",
  "maxPrice": number | null,
  "minDays": number | null,
  "location": "string" | null,
  "crossCategoryDividerText": "string"
}`;

        const result = await model.generateContent([sysPrompt, `User Query: "${query}"`]);
        let jsonStr = result.response.text().trim();

        if (jsonStr.startsWith("```json")) jsonStr = jsonStr.slice(7);
        else if (jsonStr.startsWith("```")) jsonStr = jsonStr.slice(3);
        if (jsonStr.endsWith("```")) jsonStr = jsonStr.slice(0, -3);

        const parsed = JSON.parse(jsonStr.trim());
        res.json({
            intentCategory: parsed.intentCategory || "all",
            abstractText: parsed.abstractText || query,
            maxPrice: parsed.maxPrice || null,
            minDays: parsed.minDays || null,
            location: parsed.location || null,
            crossCategoryDividerText: parsed.crossCategoryDividerText || "Outras opções incríveis",
        });
    } catch (error) {
        console.error("Gemini AI Search Error:", error);
        res.json(fallbackParser(query));
    }
});

export default router;
