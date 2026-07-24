import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("No API key");
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function run() {
    try {
        const response = await ai.models.list();
        for await (const model of response) {
            console.log(model.name);
        }
    } catch (e) {
        console.error("Error:", e);
    }
}
run();
