import { z } from "zod";

const envSchema = z.object({
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required in your .env file"),
});

const result = envSchema.safeParse(process.env);
if (!result.success) {
  console.error("\n\nCONFIGURATION ERROR:");
  result.error.issues.forEach((issue) => {
    console.error(`  - ${issue.path.toString()} - ${issue.message}`);
  });
  console.error("\n");
  process.exit(1);
}

export const env = result.data;
