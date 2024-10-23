import { chainWithHistory } from ".";
import { scenarios } from "../utils";

export const interactService = async (requestInput: RequestInput) => {

  const interactionResult = await chainWithHistory.invoke(
    {
      systemPrompt: scenarios.get(requestInput.scenarioId)?.systemPrompt,
      examples: scenarios.get(requestInput.scenarioId)?.examples,
      userInput: requestInput.input,
      language: requestInput.language,
    },
    {
      configurable: {
        sessionId: requestInput.sessionId,
      },
    },
  );

  console.log("\n=====START======\n");

  console.log("InteractionRequest: ", requestInput);

  console.log("InteractionResponse: ", interactionResult);

  console.log("\n=====END======\n");

  return interactionResult;
};
