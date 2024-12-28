import { ChatPromptTemplate } from "@langchain/core/prompts";
import { history, model } from ".";

export const summarizeService = async (requestInput: SummarizeInput) => {
  const sessionId = requestInput.sessionId;
  const h = history.get(sessionId);
  const messages = (await h?.getMessages()) || [];
  console.log("Messages: ", messages);

  const systemPrompt =
    "\
    You are an AI language tutor. Your role is to summarize the conversation between the student and the teacher, focusing on key points related to language learning. Pay attention to areas where the student demonstrated proficiency, struggled with certain vocabulary or grammar, and areas where improvement is needed.\
    When summarizing, be sure to:\
    Provide an overall assessment of the conversation.\
    Highlight specific language-related issues, such as:\
    Vocabulary use (strengths and areas for expansion).\
    Grammatical accuracy (correct and incorrect usage).\
    Pronunciation concerns (if relevant to the conversation).\
    Fluency and coherence of responses.\
    Offer constructive feedback on how the student can improve based on the conversation.\
    Keep the tone professional and encouraging, and tailor your summary to help guide the student in their language learning journey.\
  ";

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    ["user", "{input}"],
  ]);
  const chain = prompt.pipe(model);

  const summary = await chain.invoke({
    input: messages.map((m) => m.content).join("\n"),
  });

  console.log("\n=====START======\n");

  console.log("InteractionRequest: ", requestInput);

  console.log("InteractionResponse: ", summary.content);

  console.log("\n=====END======\n");

  return summary.content;
};
