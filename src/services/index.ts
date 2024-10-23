//Import the OpenAPI Large Language Model (you can import other models here eg. Cohere)
import { ChatOpenAI } from "@langchain/openai";
import { ChatVertexAI } from "@langchain/google-vertexai";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { z } from "zod";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import dotenv from "dotenv";
dotenv.config();

let model: BaseChatModel;
if (process.env.LLM_PROVIDER == "OPENAI") {
  model = new ChatOpenAI({
    model: "gpt-4",
    temperature: 0,
  });
} else {
  model = new ChatVertexAI({
    model: "gemini-1.5-pro-001",
    temperature: 0,
  });
}

const systemTemplate =
  "You are an assistant expert in learning languages, you have to detect grammar problems in users input and help the user to correct them. Alway reply in the same language as the user talks. Please alway reply to the user.\
   {systemPrompt}.\
   Here you have some examples of conversations:\
   {examples}";

const classificationSchema = z.object({
  sentiment: z
    .enum(["happy", "neutral", "sad", "angry", "frustrated"])
    .describe("The sentiment of the text"),
  aggressiveness: z
    .number()
    .int()
    .min(1)
    .max(10)
    .describe("How aggressive the text is on a scale from 1 to 10"),
  correctness: z
    .number()
    .int()
    .min(1)
    .max(10)
    .describe(
      "How the sentece is correct grammarly the text is on a scale from 1 to 10",
    ),
  errors: z
    .string()
    .describe(
      "The errors in the text. Specify the proper way to write the text and where it is wrong. Explain it in a human-readable way. Write it always in english",
    ),
  solution: z
    .string()
    .describe(
      "The solution to the errors in the text. Write the solution always in english",
    ),
  language: z.string().describe("The language the text is written in"),
  nextInteraction: z
    .string()
    .describe(
      "Answer to the user's questions and say the follow up interaction to the user. Always say something in the same language as the user talks, to keep the conversation going",
    ),
  tip: z
    .string()
    .describe(
      "A tip to help the user to help the user to improve the language. Write the tip always in english but taking into account the language the user is talking could be different",
    ),
});

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  new MessagesPlaceholder("history"),
  ["human", "{userInput}"],
]);

// Name is optional, but gives the models more clues as to what your schema represents
const llmWihStructuredOutput = model.withStructuredOutput(
  classificationSchema,
  {
    name: "extractor",
  },
);

//Calls out to the model's (OpenAI's) endpoint passing the prompt. This call returns a string
const chain = promptTemplate.pipe(llmWihStructuredOutput);

const history = new ChatMessageHistory();

export const chainWithHistory = new RunnableWithMessageHistory({
  runnable: chain,
  getMessageHistory: () => history,
  inputMessagesKey: "userInput",
  outputMessagesKey: "nextInteraction",
  historyMessagesKey: "history",
});
