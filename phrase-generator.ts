import { Configuration, OpenAIApi } from "openai";
import { readFileSync, writeFileSync } from "fs";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("Missing ENV Var: OPENAI_API_KEY");
}

const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

export async function createExample(input: { language: string; word: string }) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Create a ${input.language} example sentence with an accompanying English translation for the following word: ${input.word}. Provide the output as JSON.`,
    temperature: 0.20,
    max_tokens: 256,
  });
  const choice = response.data.choices[0];
  if (!choice) {
    throw new Error("No choice provided??");
  }

  if (choice.finish_reason !== "stop") {
    throw new Error(
      "Bad finish reason: " + JSON.stringify(choice.finish_reason)
    );
  }

  return JSON.parse(choice.text || "");
}
