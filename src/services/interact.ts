import { chainWithHistory } from ".";

export const interactService = async (userInput = "", language = "es", sessionId="") => {
  const interactionResult = await chainWithHistory.invoke(
    {
      userInput,
      language,
    },
    {
      configurable: {
        sessionId,
      },
    },
  );

  console.log("\n=====START======\n");

  console.log("InteractionRequest: ", userInput);

  console.log("InteractionResponse: ", interactionResult);

  console.log("\n=====END======\n");

  return interactionResult;
};
