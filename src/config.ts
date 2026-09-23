import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const envSchema = z.object({
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required in your .env file"),
});

const result = envSchema.safeParse(process.env);
if (!result.success) {
  console.error("\n\nCONFIGURATION ERROR:");
  for (const issue of result.error.issues) {
    console.error(`  - ${issue.path.toString()} - ${issue.message}`);
  }
  console.error("\n");
  process.exit(1);
}

export const env = result.data;

export const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
