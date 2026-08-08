// app/api/process-expense/route.ts
import { expenseListSchema } from "@/schema/ExpenseSchema";
import { createGoogle } from "@ai-sdk/google";
import { generateText, Output } from "ai";

const google = createGoogle({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio") as Blob;

    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { output } = await generateText({
      model: google("gemini-3.5-flash-lite"),
      system: SYSTEM_PROMPT,
      output: Output.object({ schema: expenseListSchema }),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "file",
              data: buffer,
              mediaType: "audio/webm",
            },
          ],
        },
      ],
    });

    return Response.json(output);
  } catch (error) {
    console.error("Failed to process expense:", error);
    return Response.json({ error: "Failed to process audio" }, { status: 500 });
  }
}

const SYSTEM_PROMPT = `
You are Fern, an intelligent voice-based expense extraction assistant.
Analyze the audio voice note and extract all distinct expense details into an array of objects.

EXTRACTION RULES:
1. Categorization: Categorize each distinct expense into ONE of the provided allowed categories. Infer the best match based on the context of the purchase. Default to "Other" if no specific category fits.
2. Multiple Items: If the user mentions multiple purchases, create a separate object for each one.
3. Multilingual Support: Handle English, Hindi, Bengali, Marathi, and mixed dialects (Hinglish/Maranglish or etc).
4. Description Translation: Summarize the purchase into the 'description' field in clean, concise English regardless of the spoken language, Also it need not be always present you can keep it empty too.
`;
