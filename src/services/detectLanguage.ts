import { z } from "zod";
import { model } from ".";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RequestDetectLanguage } from "../types";

export const detectLanguageService = async (
  requestInput: RequestDetectLanguage,
) => {
  const parser = z.object({
    locale: z
      .string()
      .describe(
        "The locale of the detected language in ISO 639-1 format for example es-ES or en-US",
      ),
    language: z
      .string()
      .describe(
        "The language of the text for example Spanish or English. Get the language in English",
      ),
  });

  const llmWihStructuredOutput = model.withStructuredOutput(parser, {
    name: "extractor",
  });

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["human", "{userInput}"],
  ]);

  const chain = promptTemplate.pipe(llmWihStructuredOutput);

  const detectLanguageResult = await chain.invoke({
    userInput: requestInput.input,
  });

  console.log("\n=====START======\n");

  console.log("InteractionRequest: ", requestInput);

  console.log("InteractionResponse: ", detectLanguageResult);

  console.log("\n=====END======\n");

  return detectLanguageResult;
};
