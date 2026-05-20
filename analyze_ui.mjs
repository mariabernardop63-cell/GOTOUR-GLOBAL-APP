import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const apiKey = "AIzaSyBX_13fjFKI3Mb1TgEju7xy-a0nlm_jo0U"; // Key from .env
const genAI = new GoogleGenerativeAI(apiKey);

async function analyzeImage() {
    try {
        const imagePath = "c:/Users/MY PC/OneDrive/Imagens/New folder/DOCUME/New folder/public/4a9a98282e96e4130b69329dae3d5a5b.jpg";
        const imageData = fs.readFileSync(imagePath);
        
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

        const prompt = "Describe this UI exactly and in immense detail. The user says this is an 'exchange rate monitor' (monitor de cambio) and it is rectangular. I need to code this exactly. Describe: 1) The layout and shape 2) The background color, text colors, theme 3) What specific text, numbers, graphs, icons, or buttons are present? 4) Where is everything positioned?";

        const imagePart = {
            inlineData: {
                data: imageData.toString("base64"),
                mimeType: "image/jpeg"
            },
        };

        const result = await model.generateContent([prompt, imagePart]);
        console.log("=== UI DESCRIPTION ===");
        console.log(result.response.text());
        console.log("======================");
    } catch (e) {
        console.error("Error analyzing image:", e);
    }
}

analyzeImage();
