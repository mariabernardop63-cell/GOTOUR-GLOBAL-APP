import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API with the key from Vite environment variables
// It needs to be VITE_GEMINI_API_KEY in the user's .env file
const getGenAI = () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        console.warn("VITE_GEMINI_API_KEY is missing. Using fallback logic.");
        return null;
    }
    return new GoogleGenerativeAI(apiKey);
};

/**
 * Fallback local filtering logic in case the API key is not ready.
 * It's rudimentary but ensures the app doesn't break.
 */
const fallbackParser = (query) => {
    const text = query.toLowerCase();
    let intentCategory = 'all';

    if (text.includes('hotel') || text.includes('hoteis') || text.includes('hotéis')) intentCategory = 'hotels';
    else if (text.includes('resort')) intentCategory = 'resorts';
    else if (text.includes('praia')) intentCategory = 'beaches';
    else if (text.includes('restaurante') || text.includes('comer') || text.includes('almoço')) intentCategory = 'restaurants';
    else if (text.includes('carro') || text.includes('alugu')) intentCategory = 'car-rental';
    else if (text.includes('voo') || text.includes('avião')) intentCategory = 'flights';
    else if (text.includes('villa') || text.includes('casa')) intentCategory = 'villas';
    else if (text.includes('hostel') || text.includes('mochileiro')) intentCategory = 'hostels';

    let maxPrice = null;
    const priceMatch = text.match(/(\d+)\s*(euros|usd|mts|meticais|€|\$)/i);
    if (priceMatch) {
        maxPrice = parseInt(priceMatch[1], 10);
    }

    return {
        intentCategory,
        abstractText: text,
        location: null,
        maxPrice: maxPrice,
        minDays: null,
        crossCategoryDividerText: 'Outras opções'
    };
};

/**
 * Ask Gemini API to semantically parse the search query and extract parameters 
 * so the frontend can route to the right tab and enforce filters.
 */
export const extractSearchIntent = async (queryText) => {
    const genAI = getGenAI();

    // Fallback if no API key is present
    if (!genAI) {
        return fallbackParser(queryText);
    }

    try {
        // Upgrade to the latest 2.0 flash model
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
2. Create an "abstractText": A very short, premium title of what they want. (E.g., Query: "Preciso de hoteis em beira por menos de 1000 euros para 3 noites". Abstract: "Hotéis na Beira (Até 1000€)")
3. Extract "maxPrice" numerically if they mention a budget (e.g. 1000). Otherwise null.
4. Extract "minDays" numerically if they mention duration (e.g. 3). Otherwise null.
5. Extract "location" if they mention a city/region. Otherwise null.
7. Create a "crossCategoryDividerText": A brilliant, context-aware short phrase that separates the exact results from the rest of the generic platform categories. Instead of a boring "Outros locais em Moçambique", it should adapt. E.g. Query "praias bonitas", text -> "Outros paraísos e opções". Query "hoteis caros", text -> "Outras opções premium e serviços". If location is known: "Explore mais em [location]".

Respond ONLY with valid JSON. Do not include markdown formatting or backticks around the json. The JSON should match exactly:
{
  "intentCategory": "string",
  "abstractText": "string",
  "maxPrice": number | null,
  "minDays": number | null,
  "location": "string" | null,
  "crossCategoryDividerText": "string"
}
`;

        const result = await model.generateContent([sysPrompt, `User Query: "${queryText}"`]);
        const response = result.response.text();
        
        let jsonStr = response.trim();
        // Fallback to strip markdown if the model hallucinates backticks
        if (jsonStr.startsWith('```json')) {
            jsonStr = jsonStr.substring(7);
            if (jsonStr.endsWith('```')) {
                jsonStr = jsonStr.substring(0, jsonStr.length - 3);
            }
        } else if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.substring(3);
            if (jsonStr.endsWith('```')) {
                jsonStr = jsonStr.substring(0, jsonStr.length - 3);
            }
        }
        
        const parsed = JSON.parse(jsonStr.trim());
        return {
            intentCategory: parsed.intentCategory || 'all',
            abstractText: parsed.abstractText || queryText,
            maxPrice: parsed.maxPrice || null,
            minDays: parsed.minDays || null,
            location: parsed.location || null,
            crossCategoryDividerText: parsed.crossCategoryDividerText || 'Outras opções incríveis'
        };

    } catch (error) {
        console.error("Gemini AI Search Parsing Error:", error);
        return fallbackParser(queryText);
    }
};
