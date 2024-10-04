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
  "You are an expert in {language}, you have to detect grammar problems sentences";

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
    .array(z.string())
    .describe(
      "The errors in the text. Specify the proper way to write the text and where it is wrong. Explain it in a human-readable way. Write each errror in a separate string",
    ),
  solution: z
    .string()
    .describe(
      "The solution to the errors in the text. Write the solution in {language}",
    ),
  language: z.string().describe("The language the text is written in"),
  nextQuestion: z.string().describe("The next question to ask the user"),
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
  outputMessagesKey: "nextQuestion",
  historyMessagesKey: "history",
});
